export const sendMessageToBot = async (message) => {

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("API Error");
    }

    const data = await response.json();

    return data.reply;

  } catch (error) {

    console.error("CHAT API ERROR:", error);

    return "Unable to connect to AI server.";
  }
};