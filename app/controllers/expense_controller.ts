import { sendError, sendSuccess } from "../utils/common";
import { executeQuery } from "../utils/database";
import * as _ from "lodash";

export const addExpense = async (req: any, res: any) => {
  try {
    // Add row in expense table
    const { reason, debtors, creditors } = req.body;
    // Debtors have paid money for creditors -> that's why they have an extra column for paid_money
    const data = await executeQuery(
      `INSERT INTO expenses (reason) VALUES ($1) returning expense_id;`,
      [reason]
    );
    const expense_id = data[0].expense_id;
    // Add debtors in debtors_expense table
    for (const debtor of debtors) {
      await executeQuery(
        `INSERT INTO debtor_expense (expense_id, user_id, money_paid) VALUES ($1, $2, $3);`,
        [expense_id, debtor?.user_id, debtor?.money_paid]
      );
    }
    // Add Creditors in creditor_expense table
    for (const creditor of creditors) {
      await executeQuery(
        `INSERT INTO creditor_expense (expense_id, user_id) VALUES ($1, $2);`,
        [expense_id, creditor?.user_id]
      );
    }
    sendSuccess(req, res, "Expense Added Successfully.");
  } catch (error) {
    console.log(error);
    sendError(req, res, error);
  }
};

export const getAllExpenses = async (req: any, res: any) => {
  try {
    const { timeframe, offset } = req.body || {};
    if (!["day", "week", "month", "year", "all"].includes(timeframe))
      sendError(req, res, "Wrong TimeFrame provided.");
    if (offset < 0) sendError(req, res, "Wrong Offset provided.");

    let statement: string;
    switch (timeframe) {
      case "all": {
        statement = `SELECT * FROM expenses`;
        break;
      }
      default: {
        statement = `SELECT * FROM expenses WHERE created_at >= NOW() - INTERVAL '${offset} ${timeframe}s'`;
      }
    }

    statement += " ORDER BY created_at desc LIMIT 10;";
    let expenses = await executeQuery(statement);
    sendSuccess(req, res, expenses);
  } catch (error) {
    console.log(error);
    sendError(req, res, error);
  }
};

export const deleteExpense = async (req: any, res: any) => {
  try {
    const { expense_id } = req.body;
    await executeQuery(
      `DELETE FROM expenses WHERE expense_id = ${expense_id};`
    );
    sendSuccess(req, res, "Expense Deleted successfully");
  } catch (error) {
    console.log(error);
    sendError(req, res, error);
  }
};

// There is a more effective way to do this. But I am ignoring this for now.
export const updateExpense = async (req: any, res: any) => {
  try {
    const { expense_id, reason, debtors, creditors } = req.body;
    const expense = await executeQuery(
      `select * from expenses where expense_id = $1`,
      [expense_id]
    );
    const { reason: old_reason } = expense?.[0];
    const old_creditors = await executeQuery(
      `select user_id from creditor_expense where expense_id = $1`,
      [expense_id]
    );
    const old_debtors = await executeQuery(
      `select user_id from debtor_expense where expense_id = $1`,
      [expense_id]
    );
    const expense_table_updated = reason !== old_reason;
    const expense_table_users_updated = !(
      _.isEqual(debtors, old_debtors) && _.isEqual(creditors, old_creditors)
    );
    if (!expense_table_updated && !expense_table_users_updated)
      sendSuccess(req, res, "No Change required");

    if (expense_table_updated) {
      await executeQuery(
        `update expenses
        set reason = $1
        where expense_id = $2;`,
        [reason, expense_id]
      );
    }
    if (expense_table_users_updated) {
      // Delete from creditor_expense and debtors_expense
      await executeQuery(
        `DELETE FROM creditor_expense WHERE expense_id = ${expense_id};`
      );
      await executeQuery(
        `DELETE FROM debtor_expense WHERE expense_id = ${expense_id};`
      );
      // Add new members in creditor_expense and debtors_expense
      for (const debtor of debtors) {
        await executeQuery(
          `INSERT INTO debtor_expense (expense_id, user_id, money_paid) VALUES ($1, $2, $3);`,
          [expense_id, debtor?.user_id, debtor?.money_paid]
        );
      }
      for (const creditor of creditors) {
        await executeQuery(
          `INSERT INTO creditor_expense (expense_id, user_id) VALUES ($1, $2);`,
          [expense_id, creditor?.user_id]
        );
      }
    }
    await executeQuery(
      `update expenses set updated_at = NOW() where expense_id=$1`,
      [expense_id]
    );
    sendSuccess(req, res, "Expenses Updated successfully.");
  } catch (error) {
    console.log(error);
    sendError(req, res, error);
  }
};

export const showTransactions = async (req: any, res: any) => {
  const {expense_id} = req.body;
};
