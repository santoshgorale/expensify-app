import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  removeExpense,
  editExpense,
  addExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

test("Should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("Should setup remove expense action object", () => {
  const action = editExpense("123abc", { note: "New note value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      note: "New note value"
    }
  });
});

test("Should setup add expense action object with provided value", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("Should add expenses to database and store", done => {
  const store = createMockStore({});
  const expenseData = {
    description: "Mouse",
    amount: 3000,
    note: "This one is better",
    createdAt: 1000
  };

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(sanpshot => {
      expect(sanpshot.val()).toEqual(expenseData);
      done();
    });
});

test("Should add expenses with defaults to database and store", done => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0
  };

  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(sanpshot => {
      expect(sanpshot.val()).toEqual(expenseDefaults);
      done();
    });
});

// test("Should setup add expense action object with default value", () => {
//   const action = addExpense({});
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       id: expect.any(String),
//       description: "",
//       note: "",
//       amount: 0,
//       createdAt: 0
//     }
//   });
// });
