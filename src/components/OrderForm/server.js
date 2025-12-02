const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const token = "6870733564:AAH4GKZRjTXUQZ1-ndFry1R-I2SBMEjkcdI";
const apiUrl = `https://api.telegram.org/bot${token}`;

app.use(bodyParser.json());

const handleCallbackQuery = async (callbackQuery) => {
  const { data, message } = callbackQuery;
  const chatId = message.chat.id;
  const messageId = message.message_id;

  const [action, status, orderId] = data.split(':');

  if (action === 'status') {
    const newText = message.text.replace('Статус: в процессе', `Статус: ${status === 'success' ? 'Успешно' : 'Отменен'}`);

    try {
      // Обновляем сообщение с новым статусом
      await axios.post(`${apiUrl}/editMessageText`, {
        chat_id: chatId,
        message_id: messageId,
        text: newText,
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: "Успешно", callback_data: `status:success:${orderId}` }],
            [{ text: "Отменен", callback_data: `status:cancelled:${orderId}` }],
          ],
        }),
        parse_mode: "HTML"
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }
};

app.post(`/webhook/${token}`, async (req, res) => {
  const { callback_query } = req.body;

  if (callback_query) {
    await handleCallbackQuery(callback_query);
  }

  res.sendStatus(200);
});

// Установка вебхука
axios.post(`${apiUrl}/setWebhook`, {
  url: `https://nobeltrade.uz/webhook/${token}`,
})
  .then(() => {
    console.log('Webhook set successfully');
  })
  .catch((err) => {
    console.error('Error setting webhook:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
