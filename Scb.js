class Scb {
    constructor() {
        //rawDataQR = null;
        token = null;
        apiKey = [Your api key];
        apiSecret = [Your api secret];
    }
    async requestToken() {
        await fetch('https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                resourceOwnerId: apiKey,
                requestUId: '{{$guid}}',
                'accept-language': 'EN',
            },
            body: JSON.stringify({
                applicationKey: apiKey,
                applicationSecret: apiSecret
            }),

        }).then((response) => response.json()).then((json) => {
            console.log(json.data.accessToken);
            token = json.data.accessToken;
        }).catch((error) => {
            console.error(error);
        });
    }
    async createDataQRcode(price,header,success) {
        await fetch('https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer '+token,
                resourceOwnerId: apiKey,
                requestUId: '{{$guid}}',
                'accept-language': 'EN',
            },
            body: JSON.stringify({
                qrType: "PP",
                ppType: "BILLERID",
                ppId: "445881476978845",
                amount: price.toString(),
                ref1: header,
                ref2: "REFERENCE2",
                ref3: "SCB"
            }),

        }).then((response) => response.json()).then((json) => {
            console.log(json.data);
            success(json.data);
            //rawDataQR = json.data.qrRawData;

        }).catch((error) => {
            console.error(error);
        });

    }
}

const scb = new Scb();
export default scb;
