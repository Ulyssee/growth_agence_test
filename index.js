const puppeteer = require('puppeteer');
const fs = require('fs');
const schedule = require('node-schedule');

//{hour: 09, minute: 0, dayOfWeek: 1}
//'28 * * * *'

//ici, en commentaire  la fonction job ne lancera le script que les lundi à 9h
//si vous voulez tester le script qui se lancera tout les lundi à 9h, enlever le commentaire de la ligne d'après et à la fin du fichier :

//const job = schedule.scheduleJob({hour: 09, minute: 0, dayOfWeek: 1}, function(){
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.maddyness.com/?s=MaddyMoney');
    await page.click('.typo-tribune');

    await page.goto(page.url());
    
    //ici, mettre directement le fichier que l'on veut scrapper 
    //await page.goto('');

    const companiesHandles = await page.$$('.singleArticle__content > p');

    for (const companiehandle of companiesHandles) {
      let article = page.url();
      let title = "undefined";
      let link = "undefined";

      try {
        title = await page.evaluate(
          element => element.querySelector('a')?.text,
          companiehandle
        );
      } catch (error) { }

      try {
        link = await page.evaluate(
          element => element.querySelector('a')?.href,
          companiehandle
        );
      } catch (error) { }
    if (title !== "undefined") {
      fs.appendFile(
        "result.csv",
        `${article},${title},${link}\n`,
        function (err) {
          if (err) throw err;
        }
      );
    }
    }
    await page.screenshot({ path: 'screenshot0.png' });
    
  await browser.close();
  })();

  // pour tester le script tout les lundis à 9h : enlever les commentaires  :
  /*
  console.log('il est 9h ce lundi');
});*/

