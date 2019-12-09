var request = require("request");

const EnviarEmail = async function(enviara, asuntoEmail, textoEmail) {
    var request = require("request");
    var data = {
        "sender": {
            "name":"Miguel Ledesma",
            "email":"posgrado@axont.com"
    },
    "to":[{"email": enviara}],
    "htmlContent": textoEmail,
    "subject": asuntoEmail,
    "replyTo":{"email":"posgrado@axont.com"},
    "tags":["41000"]
};

    var options = {
    method: 'POST',
    url: 'https://api.sendinblue.com/v3/smtp/email',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': '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'
    },
    body: JSON.stringify(data)
    };

    var rta = await request(options, async function (error, response, body) {
    if (error) throw new Error(error);
    
    console.log(body);

    if(error){
        return false;
    }else{
        return true;
    }
    });
};

  module.exports = {
    'EnviarEmail': EnviarEmail
  };