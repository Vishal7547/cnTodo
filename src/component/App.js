import { useEffect, useState } from "react";
import Heading from "./Heading";
import List from "./List";
function App() {
  const [todo, setTodo] = useState([]);
  const [update, setUpdate] = useState(true);
  const [updateTitle, setUpdateTitle] = useState("");
  const [getId, setGetid] = useState({});
  const [item, setItem] = useState("");

  useEffect(() => {
    const getData = async () => {
      let response = await fetch("https://jsonplaceholder.typicode.com/todos");
      let data = await response.json();
      data = data.slice(0, 10);
      setTodo([...data]);
    };
    getData();
  }, []);
  console.log("ho gaya", todo);
  // add todo to sate
  const postData = async (item) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        id: Date.now(),
        title: item,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const PostData = await response.json();
    console.log("after click", PostData);
    setTodo([PostData, ...todo]);

    setItem("");
    console.log("postState", todo);
  };
  // onChangeInputData :- add todo
  const onChangeHandler = (e) => {
    setItem(e.target.value);
  };
  // delete data
  const deleteMethod = async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "DELETE",
      }
    );
    const deleteData = await response.json();
    // console.log("delete data", deleteData);
    const data = todo.filter((x) => x.id !== id);
    setTodo([...data]);

    console.log("delete:", todo);
  };

  const updateData = async (item) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${getId.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          userId: 1,
          id: getId.id,
          title: item,
          completed: getId.completed,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    const storeUpdate = todo.map((x) => {
      if (x.id === getId.id) {
        return data;
      }
      return x;
    });
    setTodo([...storeUpdate]);
    setUpdate(true);
    setItem("");
  };
  // update method
  const updateMethod = (x) => {
    setUpdate(false);
    setGetid({ ...x });
    setUpdateTitle(x.title);
  };
  // console.log("get method:", getId);
  // Update checkBox
  const updateCheckBox = async (y) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${y.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          userId: 1,
          id: y.id,
          title: y.title,
          completed: !y.completed,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    const storeUpdate = todo.map((x) => {
      if (x.id === y.id) {
        return data;
      }
      return x;
    });
    setTodo([...storeUpdate]);
  };
  // remove all element from state
  const clearTodo = () => {
    setTodo([]);
  };
  return (
    <div className="container">
      {/* <h1 onClick={postData}>hello world</h1>
      <button onClick={() => deleteMethod(1)}>delete</button>
      <button onClick={() => updateMethod(5)}>update</button> */}
      <Heading
        handlePost={postData}
        onChangeHandler={onChangeHandler}
        item={item}
        update={update}
        updateTitle={updateTitle}
        updateData={updateData}
      />
      <List
        data={todo}
        handleDelete={deleteMethod}
        handleUpdate={updateMethod}
        updateCheckBox={updateCheckBox}
        clearTodo={clearTodo}
      />
    </div>
  );
}

export default App;
