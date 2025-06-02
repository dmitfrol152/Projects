let client;

const loginContainer = document.querySelector("#login");
const chatContainer = document.querySelector("#chat");
const newMessageContainer = document.querySelector("#new-message-container");
const newMessage = document.querySelector("#new-message");

const addMessage = ({ name, message }) => {
  const paragraph = document.createElement("p");

  const nameEl = document.createElement("span");
  nameEl.classList.add("name");
  nameEl.textContent = name;

  const messageEl = document.createElement("span");
  messageEl.classList.add("message");
  messageEl.textContent = message;

  paragraph.append(nameEl, messageEl);
  chatContainer.append(paragraph);
  chatContainer.scrollTop = container.scrollHeight;
};

const postMessage = (message) => {
  client.send(
    JSON.stringify({
      type: "chat_mes",
      message,
    })
  );
};

newMessage.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const value = (newMessage.value || "").trim();
    if (value) {
      postMessage(value);
      newMessage.value = "";
    }
  }
});

loginContainer.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = loginContainer.querySelector(".username").value;
  const password = loginContainer.querySelector(".password").value;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((err) => {
          throw new Error(err);
        });
      }
    })
    .then(() => {
      const wsProto = location.protocol === "https" ? "wss" : "ws";
      client = new WebSocket(`${wsProto}://${location.host}`);

      loginContainer.style.display = "none";

      client.addEventListener("open", () => {
        chatContainer.style.display = "block";
        newMessageContainer.style.display = "block";
      });

      client.addEventListener("message", async (message) => {
        let dataStr;
        if (message.data instanceof Blob) {
          dataStr = await message.data.text();
        } else {
          dataStr = message.data;
        }

        try {
          const data = JSON.parse(dataStr);
          if (data.type === "chat_mes") {
            addMessage(data);
          }
        } catch (err) {
          console.error(err);
        }
      });
    })
    .catch((err) => {
      alert(err.message);
    });
});
