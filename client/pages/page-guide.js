import { html, css } from '../components/base';
import { PageElement } from '../components';
import { redirect } from '../services/router';

const code = `
// This example is built using express
const path = require("path");
const express = require("express");
const fetch = require("node-fetch");

<mark class="highlight-block">const API_KEY = process.env.FORTER_API_KEY; // YOUR API KEY</mark>
const API_SECRET = process.env.FORTER_API_SECRET; // YOUR API KEY

const FORTER_API_URL = "https://api-secure.forter.com/v2/orders/";

const app = express();

const staticDir = path.join(__dirname, "static");
const checkoutPage = path.join(__dirname, "checkout.html");
const successPage = path.join(__dirname, "success.html");
const failedPage = path.join(__dirname, "failed.html");

app.use(express.json());
app.use("/static", express.static(staticDir));

app.get("/order-completed", (req, res) => res.sendFile(successPage));
app.get("/order-failed", (req, res) => res.sendFile(successPage));

app.get("/", (req, res) => {
  return res.sendFile(checkoutPage);
});

app.post("/pay", async (req, res) => {
  // Collect fields from checkout
  const payload = req.body || {};

  // Add idetification fo the order and time
  const orderId = payload.id;
  const timeSentToForter = payload.timestamp || Date.now();

  // Concat url to order id
  const url = \`\$\{FORTER_API_URL}/\${orderId}\`;

  // Shipping delivery info
  const primaryDeliveryDetails = {
    deliveryType: payload.shippingType || "Web",
    deliveryMehod: payload.shippingMethod || "POSTAL",
    deliveryPrice: {
      amountLocalCurrency: payload.shipping.amount,
      currency: payload.shipping.currency
    }
  };

  // Add total amount of the cart in different currencies
  const totalAmount = {
    amountUSD: payload.amountUSD,
    amountLocalCurrency: payload.amount,
    currency: payload.amount
  };

  // Cart Items info
  const cartItems = [
    {
      basicItemData: {
        price: {
          amountLocalCurrency: payload.cart.name,
          currency: payload.cart.name
        },
        productId: payload.cart.id,
        name: payload.cart.name,
        type: payload.cart.type,
        quantity: payload.cart.quantity,
        category: null
      }
    }
  ];

  // Shipping info
  const primaryRecipient = {
    address: {
      address1: payload.billing.address1,
      address2: payload.billing.address2,
      zip: payload.billing.zip,
      city: payload.billing.city,
      region: payload.billing.region,
      country: payload.billing.country,
      company: payload.billing.company
    },
    personalDetails: {
      firstName: payload.billing.firstName,
      lastName: payload.billing.lastName,
      email: payload.billing.email
    },
    phone: [
      {
        phone: payload.billing.phone
      }
    ]
  };

  // Account info
  const accountOwner = {
    firstName: payload.customer.firstName,
    lastName: payload.customer.lastName,
    email: payload.customer.email
  };
  // payment
  const payment = [
    {
      creditCard: {
        nameOnCard: payload.creditCard.nameOnCard,
        bin: payload.creditCard.bin,
        lastFourDigits: payload.creditCard.lastName,
        expirationMonth: payload.creditCard.expireMonth,
        expirationYear: payload.creditCard.expireYear,
        verificationResults: {
          avsFullResult: payload.creditCard.avs,
          cvvResult: payload.creditCard.cvc,
          authorizationCode: payload.creditCard.authCode
        },
        cardType: payload.creditCard.cardType,
        countryOfIssuance: payload.creditCard.cardCountry
      }
    }
  ];

  const connectionInformation = {
    customerIP: payload.remoteIP,
    userAgent: payload.ua,
    forterTokenCookie: req.cookies.ftrToken,
    fullHeaders: JSON.stringify(req.headers)
  };

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Version": "2021-10-19",
      "X-Api-Key": API_KEY
    },
    body: {
      orderId,
      orderType: "WEB",
      timeSentToForter,
      totalAmount,
      cartItems,
      primaryDeliveryDetails,
      primaryRecipient,
      accountOwner,
      totalDiscount: null,
      payment,
      connectionInformation
    }
  }).then((data) => data.json());
  const { decision } = response;

  if (decision === "approve") {
    res.redirect("/order-completed");
  }
  return res.redirect("//");
});

app.post("/webhooks/payment-status", async (req, res) => {
  const { eventType, payment } = req.body;
  const { id, orderId, status } = payment;

  if (status === "AUTHORIZED" || status === "SETTLED") {
    // Fullfil the order for the Payment / Client Session labelled with \`orderId\`
  }
});

app.listen(process.env.PORT);

`;

const code2 = `
{
  "orderId": "M391d1240-2b4f-4991-ab5e-1b0f2eb779b5",
  "orderType": "WEB",
  "timeSentToForter": 1426071000000,
  "additionalIdentifiers": {
    "additionalOrderId": null,
    "paymentGatewayId": "ZMO9-G8AJ",
    "magentoAdditionalOrderData": {
      "magentoOrderStage": "AFTER_PAYMENT_ACTION"
    }
  },
  "totalAmount": {
    "amountUSD": null,
    "amountLocalCurrency": "4111.74",
    "currency": "USD"
  },
  "cartItems": [
    {
      "basicItemData": {
        "price": {
          "amountLocalCurrency": "3668.89",
          "currency": "USD"
        },
        "value": {
          "amountLocalCurrency": "3668.89",
          "currency": "USD"
        },
        "productId": "599389",
        "name": "Gucci Red Zumi Snakeskin Small Top Handle Bag",
        "type": "TANGIBLE",
        "quantity": 1,
        "category": null
      }
    },
    {
      "basicItemData": {
        "price": {
          "amountLocalCurrency": "185.99",
          "currency": "USD"
        },
        "value": {
          "amountLocalCurrency": "185.99",
          "currency": "USD"
        },
        "productId": "377931",
        "name": "Gucci Orange Gradient Square Ladies Sunglasses GG0443S 005 60",
        "type": "TANGIBLE",
        "quantity": 1,
        "category": null
      },
      "itemSpecificData": {
        "physicalGoods": {
          "wrapAsGift": false
        }
      }
    }
  ],
  "primaryDeliveryDetails": {
    "deliveryType": "PHYSICAL",
    "deliveryMethod": "Shipping - UPS 2nd Day Est. Delivery Thu, Jun",
    "deliveryPrice": {
      "amountLocalCurrency": "14.99",
      "currency": "USD"
    }
  },
  "primaryRecipient": {
    "address": {
      "address1": "293 Turnpike Rd",
      "address2": "819",
      "zip": "01581",
      "city": "Westborough",
      "region": "Massachusetts",
      "country": "US",
      "company": "",
      "savedData": {
        "usedSavedData": false,
        "choseToSaveData": false
      }
    },
    "personalDetails": {
      "firstName": "Quan",
      "lastName": "Vuong",
      "email": "vcq304@gmail.com"
    },
    "phone": [
      {
        "phone": "(267) 438 - 9887"
      }
    ]
  },
  "accountOwner": {
    "firstName": "Quan",
    "lastName": "Vuong",
    "email": "vcq304@gmail.com"
  },
  "customerAccountData": {
    "status": "GUEST",
    "customerEngagement": {
      "wishlist": {
        "inUse": false,
        "itemInListCount": 0
      },
      "reviewsWritten": {
        "inUse": false,
        "itemInListCount": 0
      },
      "newsletters": {
        "inUse": false
      }
    }
  },
  "totalDiscount": null,
  "payment": [
    {
      "billingDetails": {
        "personalDetails": {
          "firstName": "Quan",
          "lastName": "Vuong",
          "email": "vcq304@gmail.com"
        },
        "address": {
          "address1": "293 Turnpike Rd",
          "address2": "819",
          "zip": "01581",
          "city": "Westborough",
          "region": "Massachusetts",
          "country": "US",
          "company": "",
          "savedData": {
            "usedSavedData": false,
            "choseToSaveData": false
          }
        },
        "phone": [
          {
            "phone": "(267) 438 - 9887"
          }
        ]
      },
      "paymentMethodNickname": "affirm_gateway",
      "amount": {
        "amountLocalCurrency": "4111.74",
        "currency": "USD"
      }
    }
  ],
  "connectionInformation": {
    "customerIP": "205.232.136.146",
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    "forterTokenCookie": "4ead41dd5400454aa1282013338b75b5_1655190863587__UDF43_9ck",
    "fullHeaders": "{\\"X-Varnish\\":\\"423400438\\",\\"X-Forwarded-For\\":\\"96.252.81.131, 172.70.110.121, 172.24.32.152\\",\\"Cf-Worker\\":\\"jomashop.com\\",\\"Origin\\":\\"https:\\\\/\\\\/www.jomashop.com\\",\\"Cf-Trustscore\\":\\"93\\",\\"Cf-Connecting-Ip\\":\\"96.252.81.131\\",\\"User-Agent\\":\\"Mozilla\\\\/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit\\\\/605.1.15 (KHTML, like Gecko) Version\\\\/15.4 Mobile\\\\/15E148 Safari\\\\/604.1\\",\\"Referer\\":\\"https:\\\\/\\\\/www.jomashop.com\\\\/checkout\\\\/\\",\\"Cookie\\":\\"private_content_version=f71c9e9291449b48742fc33e33eb442d; _sp_id.5d7c=538cf58a5882c4f7.1655190027.1.1655191889.1655190027; _sp_ses.5d7c=*; _fbp=fb.1.1655189782732.57417988; bounceClientVisit355=N4IgbiBcoM4K4CMD6B7AdjAlgFwKZQDMBDAGxlwBoQSUBzW3AEyUzUNPKoGMiAnbJAEdsATygAmbnwFEAttigBmABwBWACwA6Zcqn8kjTDC4o4aBZGJlKIXGFy8kNekxZtLHGwAdeKRnC5sGCRsXiIuAGsmKAAGKkwEAA8Q3BgLK04QHn4oULgbAHcjAAsSIwEcXFkYdmsqZwZmVhZGXHNMAkxoj2sAXypGWgAxTF40gBkUIkZc3nyqYr5GAEkAESgQcQBBAE0uADYAVQA5Y+UtgCsAWSIiAAUMAAkvAHEuACFZLyJlgGUQKgwFAEbBrDbbPb7ABKEShADUCokdgUvAgoQB5VZQlAINCYADSAHVEuiASBBlBQEY7rw7JhTDAAMJwNIoWQOWqZIy-RDGXgJDk9cj9EAEMAWACM+1UqglygAnAB2ZSKKhgTAzSBSmVypUq9TqCXy5T7KhEFBQCX1LwbYrYbBeGAAUkUWyd4iG7qGBR9mgubKIMGKKC8mhMsi9ZMDlrVXggkHUknJGxtVF4GzJXHFlulsoVytVICwmolMV0IFoXHTkEUqiosliAw1G32EqlyqVMUVqnlMVUykVhvlZJI2a1ud1A8VUi+REwtAwlJAEvUSpXEqXYHjSdHkonCqn9SI6pL+71igNRpNR5zOoP+yTx5jopgRFveeND7NNS1Zotv5AKYoAAbW1D8TXEABdeJ-ytEACizd9J32dQqAQpD73UXoRWKLgkC4YpcEiUxJSoOBmy1XogA; _ga_HD3RMEK6RR=GS1.1.1655189779.1.1.1655191872.0; cooPageCount=43; attntv_mstore_phone=2674389887:0; _vuid=0a67ebe5-d62a-4425-b073-bc3af344f8da; attntv_mstore_email=vcq304@gmail.com:0; _clsk=1ugmy1z|1655191790623|42|1|www.clarity.ms\\\\/eus-e\\\\/collect; wz.data=%7B%22lastPrtTS%22%3A1655191790141%2C%22sessions%22%3A%7B%22hcQa819x610l1Z1m5537m8X8G%22%3A43%7D%7D; wz.nv=1; wz.sid_9793ff8f-b652-409f-ab95-df6bb6bb7f26=hcQa819x610l1Z1m5537m8X8G; __attentive_pv=37; _attn_=eyJ1Ijoie1wiY29cIjoxNjU1MTg5Nzg0MzY3LFwidW9cIjoxNjU1MTg5Nzg0MzY3LFwibWFcIjoyMTkwMCxcImluXCI6ZmFsc2UsXCJ2YWxcIjpcIjJjYzAyMGExNTJiMTQ2NjBhNDM3NTFhNzYwOTNmZWE4XCJ9In0=; language=en_US; ledgerCurrency=USD; _uetsid=196c3a70ebaf11ecb2fbc7bdccc0d5fc; _uetvid=196c5f90ebaf11eca5411d22e0e298f5; __cf_bm=X4.H1EEKM5ht9ykcSp7b_pvtqsh_MmM3dBMmnlpFcgs-1655191684-0-AfMdGDLDJj1HeBL4AT0IR6yDy7udk+Qsm3wpDifHbrrVFVukb+UaQe9dK9dt0h5oj4HWbRdVCDZ6Nqf5vLeLNb2Q4gkME+mFL0gNOqDBioiq; __attentive_ss_referrer=\\\\\\"ORGANIC\\\\\\"; _ga=GA1.1.171337966.1655189780; _pin_unauth=dWlkPU5UQTFaRGRqTW1RdFl6ZzBNQzAwWldGaUxUZzBPVEl0TVRNellUSTVORFUxWlRZMg; forterToken=4ead41dd5400454aa1282013338b75b5_1655190863587__UDF43_9ck; UUID=b5d8f06-71e5-dbbc-2775-16133eb08ac; isVisitorNew=true; tracker_device=c8e3dde2-1dfe-4a11-af81-06d7de54ea53; apay-session-set=WKibQUcXe0yBLDIxFnH6UdqVoYEgS0qPyiOBXHzrmv413qlPKsk2Di5ILSIUTVQ%3D; __attentive_cco=1655189784361; __attentive_dv=1; __attentive_id=2cc020a152b14660a43751a76093fea8; __idcontext=eyJjb29raWVJRCI6IjJBWWM2VU5OOEFqTWFhUG5zSHBHY0JtcGFJUyIsImRldmljZUlEIjoiMkFZYzZSa1JWd3hZd3BiUk9EUm9ibmlLV3hPIiwiaXYiOiIiLCJ2IjoiIn0%3D; _clck=jnvpu4|1|f2b|0; GSIDgn7uqQ6V9PiU=8c1b6d35-d1e3-4e93-a8f8-2f2bc490d2e6; SREC_SESSION=V1.1655189782618; STSID874673=4e6cd77a-29e5-4589-b8a4-7608b980d97a; ltkSubscriber-FooterNew=eyJsdGtDaGFubmVsIjoiZW1haWwiLCJsdGtUcmlnZ2VyIjoibG9hZCJ9; ltkSubscriber-warranty=eyJsdGtDaGFubmVsIjoiZW1haWwiLCJsdGtUcmlnZ2VyIjoibG9hZCIsImx0a1NhdmVkIjp0cnVlfQ%3D%3D; ltkpopup-session-depth=1-5; _gcl_au=1.1.431770261.1655189781; _gid=GA1.2.1248591398.1655189780; wz.uid=469H0Z81mL581158B71E8JUKQ; _ALGOLIA=anonymous-d4aba307-26fb-42c7-8a08-3c4ba8c3c316; __wid=135203909; ftr_blst_1h=1655189779990; ftr_ncd=6\\",\\"Accept\\":\\"*\\\\/*\\",\\"Accept-Language\\":\\"en-US,en;q=0.9\\",\\"Cdn-Loop\\":\\"cloudflare; subreqs=1\\",\\"Cf-Ew-Via\\":\\"15\\",\\"Content-Type\\":\\"application\\\\/json\\",\\"Cf-Visitor\\":\\"{\\\\\\"scheme\\\\\\":\\\\\\"https\\\\\\"}\\",\\"Cf-Ray\\":\\"71b15f6f50661855-EWR\\",\\"Cf-Ipcountry\\":\\"US\\",\\"Accept-Encoding\\":\\"gzip\\",\\"Content-Length\\":\\"550\\",\\"Ssl-Offloaded\\":\\"1\\",\\"X-Forwarded-Proto\\":\\"https\\",\\"X-Real-Ip\\":\\"96.252.81.131\\",\\"Host\\":\\"app.jomashop.com\\"}"
  }
}

`;

const code3 = `
{
  "id": "M391d1240-2b4f-4991-ab5e-1b0f2eb779b5",
  "timestamp": 1426071000,
  "amount": "4111.74",
  "amountUSD": "4111.74",
  "currency": "USD",
  "ua": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
  "remoteIP": "205.232.136.146",
  "forterToken": "",
  "customer": {
    "firstName": "mim",
    "lastName": "spi",
    "userEmail": "mim@zuckers.com",
    "userPhone": "7186219294"
  },
  "billingAddress": {
    "firstName": "mir",
    "lastName": "spi",
    "address1": "117901 21st ave",
    "address2": "",
    "city": "Brooklyn",
    "state": "NY",
    "country": "US",
    "zip": "11214",
    "phone": "718XXX9294"
  },
  "shippingAddress": {
    "firstName": "mim",
    "lastName": "spi",
    "address1": "1111 21st ave",
    "address2": "",
    "city": "Brooklyn",
    "state": "NY",
    "country": "US",
    "zip": "11214",
    "phone": "718XXX294"
  },
  "creditCard": {
    
    "bin": "373202",
    "cardType": "AMEX",
    "nameOnCard": "mim spi",
    "last4": "3202",
    "avsResult": "N",
    "cvvResult": "",
    "expireMonth": "06",
    "expireYear": "2097",
    "authCode": "A33244",
    "avs": "Y",
    "cvv": "M",
    "cardCountry": "US"
  },
  "comments": "Authorized amount of $183.73. Transaction ID: \\"6995491613\\".&#x0D;, Forter: Order was sent to Forter.&#x0D;, Forter: Transaction not in policy | Link in portal: https://portal.forter.com/dashboard/64641&#x0D;\\nDate/Time Ordered on Magento: 2015-03-11 14:49:47\\nImported On: Mar 11 2015 10:50AM\\nEmail: miriam@zuckers.com\\nPrevious Order(s): M1A1H2A-03/11/2015, M1A1H29-03/11/2015, M1A1H28-03/11/2015, M1A1H27-03/11/2015, M1A1H26-03/10/2015, M1A1H1V-03/04/2015, M1A1H1U-03/04/2015, M1A1H1S-03/04/2015, M1A1H11-02/24/2015, M1A1H10-02/24/2015, M1A1H0Z-02/24/2015, M1A1G9X-02/18/2015, M1A1G9U-02/18/2015, M1A1G9T-02/18/2015, M1A1G9R-02/18/2015, M1A1G97-02/11/2015, M1A1G96-02/11/2015, M1A1G95-02/11/2015, M1A1G94-02/11/2015, M1A1G93-02/11/2015, M1A1G92-02/11/2015, M1A1G8T-02/09/2015, M1A1G8S-02/09/2015, M1A1G8Q-02/09/2015, M1A1G8P-02/09/2015, M1A1G8I-02/09/2015, 8104808-12/26/2012, 645937-12/18/2012, 635611-12/06/2012\\n\\nForter status :-3    MagentoApi: 2015-03-11 11:15:24. Order Cancelled by miriam",
  "shippingMethod": "POSTAL",
  "shippingPrice": "0.00",
  "phone": {
    "customerWebId": "",
    "incomingCallerId": "",
    "callLength": "",
    "forterNotes": "Authorized amount of $183.73. Transaction ID: \\"6995491613\\".&#x0D;, Forter: Order was sent to Forter.&#x0D;, Forter: Transaction not in policy | Link in portal: https://portal.forter.com/dashboard/64641&#x0D;\\nDate/Time Ordered on Magento: 2015-03-11 14:49:47\\nImported On: Mar 11 2015 10:50AM\\nEmail: miriam@zuckers.com\\nPrevious Order(s): M1A1H2A-03/11/2015, M1A1H29-03/11/2015, M1A1H28-03/11/2015, M1A1H27-03/11/2015, M1A1H26-03/10/2015, M1A1H1V-03/04/2015, M1A1H1U-03/04/2015, M1A1H1S-03/04/2015, M1A1H11-02/24/2015, M1A1H10-02/24/2015, M1A1H0Z-02/24/2015, M1A1G9X-02/18/2015, M1A1G9U-02/18/2015, M1A1G9T-02/18/2015, M1A1G9R-02/18/2015, M1A1G97-02/11/2015, M1A1G96-02/11/2015, M1A1G95-02/11/2015, M1A1G94-02/11/2015, M1A1G93-02/11/2015, M1A1G92-02/11/2015, M1A1G8T-02/09/2015, M1A1G8S-02/09/2015, M1A1G8Q-02/09/2015, M1A1G8P-02/09/2015, M1A1G8I-02/09/2015, 8104808-12/26/2012, 645937-12/18/2012, 635611-12/06/2012\\n\\nForter status :-3    MagentoApi: 2015-03-11 11:15:24. Order Cancelled by miriam"
  },
  "otherInformation": {
    "sendThisOrderAsAGift": "N"
  },
  "cart": {
    "name": "Gucci Red Zumi Snakeskin Small Top Handle Bag",
    "price": "3668.89",
    "currency": "USD",
    "id": "599389",
    "type": "TANGIBLE",
    "quantity": 1,
    "category": null
  }
}

`;

/**
 * guide Page - Dashboard to show status of the Onboarding.
 *
 * @element page-guide
 */
export class PageGuide extends PageElement {
  constructor() {
    super();
    document.addEventListener('scroll', () => {
      const items = [...document.getElementsByClassName('text-block')].reduce(
        (acc, val) => {
          if (acc.getBoundingClientRect().top < 0) return val;
          if (
            val.getBoundingClientRect().top < acc.getBoundingClientRect().top
          ) {
            return val;
          }
          return acc;
        },
        { getBoundingClientRect: () => ({ top: -1 }) }
      );

      [...document.getElementsByClassName('text-block')].forEach((element) => {
        element.classList.remove('high');
      });
      items.classList.add('high');
    });
  }

  static get styles() {
    return css`
      .guide-wrapper {
        display: flex;
      }

      .block {
        width: 50%;
      }
    `;
  }

  render() {
    return html`
      <section class="not-found to-top">
        <div class="guide-wrapper">
          <div class="left-block">
            <div class="text-block">
              <h4>Prepare your API key</h4>
              <p>
                Server-side requests are authenticated using an API key in the X-Api-Key header.
              </p>
              <p>
                You can create an API key by visiting your Dashboard.
              </p>
              <p>
                Learn more about API authentication in our API Reference.
              </p>
            </div>
            
            <div class="text-block">
              <h3>Add the Forter SDK as a dependency</h3>
              <p>
                To get started, add the Primer Web SDK to your checkout page. In this example, we will add the SDK using our CDN.
              </p>
              <p>
                <h5>Add js snippet:</h5>
                <fc-code-block language="javascript">
                  //add snippet code
                </fc-code-block>
              </p>
            </div>

            <div class="text-block">
              <h2>Create Order Request:</h2>
              <p>
                User forter Api to create order api with the following payload:
              </p>
              <fc-code-block language="javascript">
                //add snippet code
              </fc-code-block>
            </div>

            <div class="text-block">
              <h2>Hook your payment:</h2>
              <p>
                In order to get a clear payment status, you can use our webhook and we will inform you.
              </p>
            </div>
             <button
              class="right"
            >
              <div class="error-icon"><</div>
              Get your reward
            </button>
           
          </div>
          <div class="divider"></div>
          <div class="right-block">
            <fc-tabs style="position: sticky; top: 0; display: block; align-self: flex-start;">
              <fc-link slot="tab">server.js</fc-link> 
              <fc-link slot="tab">merchant.json</fc-link>
              <fc-link slot="tab">forter.json</fc-link>
              
              <section slot="section">
                <fc-code-block style="height: 95vh; overflow-y: scroll;" language="javascript">${code}</fc-code-block>
              </section> 
              <section slot="section">
                <fc-code-block style="height: 95vh; overflow-y: scroll;" language="json">${code3}</fc-code-block>
              </section>
              <section slot="section">
                <fc-code-block style="height: 95vh; overflow-y: scroll;" language="json">${code2}</fc-code-block>
              </section>
            </fc-tabs>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('page-guide', PageGuide);
