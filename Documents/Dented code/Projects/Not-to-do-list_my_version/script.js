let taskList = [];
const ttlHrs = 24 * 5;

const handleOnSubmit = (e) => {
  const newForm = new FormData(e);
  const task = newForm.get("task");
  const hr = newForm.get("hr");

  const obj = {
    task: task,
    hr: +hr,
    id: randomIdGenerator(),
    type: "entry",
  };

  const existingTtl = taskTotal();

  if (existingTtl + hr > ttlHrs) {
    return alert("Sorry the weekly allocated weekly times have been exaushed");
  }
  taskList.push(obj);
  displayEntry();
};

const displayEntry = () => {
  let str = "";
  const entryElm = document.getElementById("entryList");
  let updatedEntry = taskList.filter((item) => item.type === "entry");
  updatedEntry.map((item, index) => {
    str += `  <tr class="md">
  <td>${index + 1}</td>
  <td>${item.task}</td>
  <td>${item.hr}</td>
  <td class="text-end">
    <button onclick="switchToBad('${
      item.id
    }','bad')" class="btn rounded bg-warning">
      <i class="fa-solid fa-arrow-right"></i>
    </button>
    <button onclick="handleOnDelete('${
      item.id
    }')" class="rounded bg-danger btn">
      <i class="fa-solid fa-trash"></i>
    </button>
  </td>
</tr>`;
  });

  entryElm.innerHTML = str;
  displayBadList();
};

const displayBadList = (item) => {
  let str = "";
  let badhrsTtl = document.getElementById("savedHrs");
  const badListElm = document.getElementById("badList");
  const updatedBadList = taskList.filter((item, i) => item.type === "bad");

  const savedHrs = updatedBadList.reduce((acc, item) => acc + item.hr);
  badhrsTtl.innerText = savedHrs;

  updatedBadList.map((item, index) => {
    str += ` <tr class="md">
  <td>${index + 1}</td>
  <td>${item.task}</td>
  <td>${item.hr}</td>
  <td class="text-end">
  <button onclick="switchToBad('${
    item.id
  }','entry')" class="btn rounded bg-success">
    <i class="fa-solid fa-arrow-left"></i>
  </button>
  <button onclick="handleOnDelete('${item.id}')" class="rounded bg-danger btn">
    <i class="fa-solid fa-trash"></i>
  </button>
  </td>
</tr>`;
  });
  badListElm.innerHTML = str;
};

const switchToBad = (id, type) => {
  taskList.filter((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });

  displayEntry();
  displayBadList();
};

const handleOnDelete = (id) => {
  if (window.confirm()) {
    const updatedTaskList = taskList.filter((item, index) => item.id !== id);
    taskList = updatedTaskList;
    displayEntry();
  }
};

const randomIdGenerator = () => {
  const str = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  let id = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.round(Math.random() * str.length);
    id += str[randomIndex];
  }
  return id;
};

const taskTotal = () => {
  const ttlhrsElm = document.getElementById("ttlHrs");
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  ttlhrsElm.innerText = ttlHr;
  return ttlHr;
};
