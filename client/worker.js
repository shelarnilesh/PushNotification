console.log('Service worker loaded');

self.addEventListener("push",e => {
    const data = e.data.json();
    console.log("push recieved");
    self.registration.showNotification(data.title,
        {
            body:'Notification from server!',
            icon:'https://www.logotaglines.com/wp-content/uploads/2016/08/HDFC_Bank_Logo-e1470986841531-1200x1528.jpg'});
        });


        self.addEventListener('notificationclick', function (event) {
event.notification.close();
console.log('Notification notificationclick triggered');
event.waitUntil(
clients.openWindow('https://www.hdfcbank.com/personal/pay/cards/credit-cards')
);
})


