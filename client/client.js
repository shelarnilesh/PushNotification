const publicVapidKey="BFgx3hzhfEhzLcJ8jfjmC8Ud-orWbDYXGL-jfbVXKwif1G5jAMGhaKUzVN15bAsBoKfe7cqjhhwwT0aKUXhVJR4";

function sendNotification(){
if('serviceWorker' in navigator)
    {
        send().catch(e => console.error(e));
    }
}


    async function send() {

        
        console.log('Regestering service worker');
        const register= await navigator.serviceWorker.register('/worker.js',{scope:'/'});

        console.log("service worker registered");

        console.log('Regestering push..');
        const subscription= await register.pushManager.subscribe({
            userVisibleOnly:true,
            applicationServerKey:urlBase64ToUint8Array(publicVapidKey)
        });
        
        console.log('Push registered.');

        console.log('sending push');

        await fetch('/subscribe', {
            method:'POST',
            body: JSON.stringify(subscription),
            headers:{
                'content-type':'application/json'
            }
        });

        console.log('push sent');
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');
      
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
      
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      }