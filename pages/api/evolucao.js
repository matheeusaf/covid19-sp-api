import CSVJSON from 'csvjson-csv2json';

async function defpattern(request, response) {
    const dynamicDate = new Date();
    const data = await fetch("https://www.saopaulo.sp.gov.br/wp-content/uploads/" + dynamicDate.getFullYear() + "/" +
    (dynamicDate.getMonth() + 1).toString().padStart(2, '0') + "/" + formatDate(dynamicDate.toUTCString()) + "_evolucao_aplicacao_doses.csv")
    const datatxt = await data.text(data);
    const datajson = CSVJSON.csv2json(datatxt);

    response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    response.json({
        updated_at: formatDate(dynamicDate.toUTCString()),
        data: datajson
    })
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    var hours = new Date(),
        hours = hours.getHours();

    if (month.length < 2) 
        month = '0' + month;
    if (hours <= 20)
        day = parseFloat(day);
        day = day - 1;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('');
}

export default defpattern;