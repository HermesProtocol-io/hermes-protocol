/**
 * POST /api/contact-form
 */


export interface FormObj {
    email: string,
    contact_reason: string,
    message: string
}

export function handleJsonRequest(r: Response) {
    if (r.ok) return r.json();
    throw new Error(
      `Error with fetch! #${r.status} - ${r.statusText} from URL: ${r.url}`
    );
}

const jsonHeader = {
    headers: {
        Accept: "application/json",
        "api-key": SENDINBLUE_API_KEY,
        "content-type": "application/json"
    }
};

export function createDataBodyForUser(templateId: number, toAddress: string) {
    return {
        "to":[  
            {  
               "email": toAddress
            }
        ],
        "templateId":templateId,
        "params":{  
            "email": toAddress
        },
        "headers":{  
            "charset":"iso-8859-1"
        }
    }
}

export function createDataBodyForStaff(senderName: string, senderEmail: string, toAddress: string, replyToAddress: string, subject: string, body: string) {
    return {
        "sender": {
            "name": senderName,
            "email": senderEmail
        },
        "to":[  
            {  
               "email": toAddress
            }
        ],
        "replyTo": replyToAddress,
        "subject": subject, //"Hermes Protocol - Contact Form",
        "textContent": body,
        /*  From: {{1.email}}
            Subject: {{1.company}} {{1.name}}
        
            Message: {{1.message}}*/
        "headers":{  
            "charset":"iso-8859-1"
        }
    }
}

export async function onRequestPost(context) {
    try {
        let input = await context.request.formData();

        // Convert FormData to JSON
        // NOTE: Allows multiple values per key
        let output = {};
        for (let [key, value] of input) {
            let tmp = output[key];
            if (tmp === undefined) {
                output[key] = value;
            } else {
                output[key] = [].concat(tmp, value);
            }
        }

        const pretty = JSON.stringify(output, null, 2);

        const formObj: FormObj = output;

        // Send email to submitter
        // Template: "Hermes Protocol - Contacto"
        // To: Submitter email
        // Reply To: "Hermes Protocol" <support@hermesprotocol.io>
        // Sender: "Hermes Protocol" <support@hermesprotocol.io>

        const result = await fetch("https://api.sendinblue.com/v3/smtp/email", jsonHeader).then((r) => handleJsonRequest(r));


        return new Response(pretty, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        });
    } catch (err) {
        return new Response('Error parsing JSON content', { status: 400 });
    }
}