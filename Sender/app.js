import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";

const numeros = [
    //coloque aqui os numeros que deseja enviar as mensagens 
    //ex: "554700000000", "554139990000" 
    //siga o formato apresentado acima para o codigo funcionar corretamente
];
const mensagem = `Mensagem que deseja enviar`;

const client = new Client();

client.on('qr', (qr) => {
    console.log('QR Code gerado!');
    qrcode.generate(qr, { small: true });
    console.log("Escaneie o QR Code para continuar");
});

client.on("ready", async () => {
    console.log("Logado e pronto");
    setTimeout(enviarMensagem, 2000);
});

client.on('disconnected', (reason) => {
    console.error('WhatsApp desconectado:', reason);
});

const enviarMensagem = async () => {
    for (const num of numeros) {
        const chatId = `${num}@c.us`;
        console.log(`Tentando enviar para: ${chatId}`);
        try {
            const isRegistered = await client.isRegisteredUser(chatId);
            if (isRegistered) {
                const message = await client.sendMessage(chatId, mensagem);
                console.log(`Mensagem enviada para: ${num}, ID: ${message.id.id}`); 
            } else {
                console.warn(`O número ${num} não está registrado no WhatsApp.`);
            }
        } catch (error) {
            console.error(`Erro ao enviar mensagem para ${num}:`, error); 
             if (error.text) {
                console.error("Mensagem de erro detalhada:", error.text) 
            }
        }
    }
    console.log('Envio de mensagens concluído!');
    
};

client.initialize();