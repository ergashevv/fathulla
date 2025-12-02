const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const token = "6870733564:AAH4GKZRjTXUQZ1-ndFry1R-I2SBMEjkcdI";

app.post('/webhook', async (req, res) => {
    const { callback_query } = req.body;
    if (callback_query) {
        const [action, status, orderId] = callback_query.data.split(':');
        if (action === 'status') {
            // Обновите статус заказа в вашей базе данных
            await updateOrderStatus(orderId, status);
            
            // Отправьте подтверждение в Telegram
            await axios.post(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
                callback_query_id: callback_query.id,
                text: `Статус заказа ${orderId} обновлен на ${status === 'success' ? 'Успешно' : 'Отменен'}`
            });
            
            // Обновите сообщение в чате
            const updatedText = `${callback_query.message.text}\n\n<b>Статус:</b> ${status === 'success' ? 'Успешно' : 'Отменен'}`;
            await axios.post(`https://api.telegram.org/bot${token}/editMessageText`, {
                chat_id: callback_query.message.chat.id,
                message_id: callback_query.message.message_id,
                text: updatedText,
                parse_mode: 'HTML'
            });
        }
    }
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Webhook server is running on port 3000'));

// Функция для обновления статуса заказа в вашей базе данных
async function updateOrderStatus(orderId, status) {
    // Реализуйте обновление статуса в вашей базе данных
    console.log(`Updating order ${orderId} status to ${status}`);
    // Здесь должен быть код для обновления статуса в вашей базе данных
}

// Настройка webhook (выполните это один раз при запуске сервера)
axios.post(`https://api.telegram.org/bot${token}/setWebhook`, {
    url: 'https://your-url/webhook'
}).then(() => {
    console.log('Webhook set successfully');
}).catch((error) => {
    console.error('Error setting webhook:', error);
});