import {
    SiFirst,
    SiLastpass
} from "react-icons/si";

import {
    BsFillStarFill,
    BsStarHalf
} from "react-icons/bs";

/*
 * Keskiarvon laskeva funktio
 *
 * Lähde:
 * 
 * How to compute the sum and average of elements in an array?
 * - https://stackoverflow.com/questions/10359907/how-to-compute-the-sum-and-average-of-elements-in-an-array
 */
export const average = arr => arr.reduce( (p, c ) => p + c, 0 ) / arr.length;

/*
 * 
 * Kuinka float -tyyppinen keskiarvo koodatan tähdiksi.
 * 
 * Muunnos on kaksivaiheinen.
 * 1) koodataan apusarakkeeseen tähtimuotoinen esitys
 * 2) Koska esillä olevan aineiston lajittelu pitää hoitaa alkuperäisen numeroarvon avulla,
 *    vasta lopussa tähdet kopioidaan selaimelle lähtettävään kopioon alkuperäisen 
 *    luvun tilalle.
 * 
 */
export const convertAverageToStars = (avg) => {

    let val = [];

    for(let i = 0; i < Math.floor(avg); i ++)
        val.push(<BsFillStarFill key={`bfsf-${i}`}/>);
    
    if(avg % 1 >= 0.5)
        val.push(<BsStarHalf key={`bfh-1`}/>);

    return val;
}


/*
 * Selaimelle lähetettävän setin viimeistely, jossa numero korvataan tähdillä.
 * (Prosessin vaihe2)
 */
export const displayStars = (list, key, value) => {

    return list.map(item => {
        return {
            ...item,
            [key]: item[value]
        }
    })

}


/*
 * Montako sivua tarvitaan, että kaikki objektit saadaa esitettyä, kun yhdelle sivulle 
 * mahtuu korkeintaan [itemsPerPage] objektia
 * 
 * Sivutukseen tarvittava tieto
 */
export const getNumberOfPagesTotal = (state, itemsTotal) => {

  //let pagesTotal = state.totalPages;
  let pagesTotal = 0;
  let itemsPerPage = state.itemsPerPage;

  if(itemsTotal > 0 && itemsPerPage > 0)
      pagesTotal = (Math.ceil(itemsTotal / itemsPerPage))

  return pagesTotal
}


/*
 * Lasketaan sivutuslinkeissä esitettävien sivut.
 * - linkkien muodostamisen ensimmäinen vaihe
 */
const getPaginationIndexes = (currentPage, maxNumberOfPaginationLinks, totalPages) => {

  let alaRaja = 1;
  let vasen = true;           // Onko "vasemmalla tilaa"
  let ylaRaja = totalPages;
  let oikea = true;           // Onko "oikealla tilaa"

  let i = 0;
  let j = 1;                  // Kytkin jonka avulla laskurin arvoa käännetään positivisen ja negatiivisen välillä
  let index = currentPage;

  let indexes = [];

  let valmis = false

  do {
      index = index + (i * j);

      // lisätään sivu, mikäli indeksi taulukon sisällä
      if((index >= alaRaja) && (index <= ylaRaja))
          indexes.push(index)

      /*
       * Onko taulukossa vielä pienempiä / suurempia indeksejä
       */
      if(index === alaRaja)
          vasen = false;

      if(index === ylaRaja)
          oikea = false;

      /*
       * Jatketaanko silmukkaa
       * - riittävä määrä sivuja kasassa
       */
      if(indexes.length === maxNumberOfPaginationLinks)
          valmis = true;
      

      /*
       * Sivulle mahtuu enemmän objekteja, kuin mitä kantaan on talletettu.
       * Ei siis tarvetta sivutukselle.
       * - numberOfItems > totalPages
       */
      if(vasen===false & oikea===false)
          valmis = true;

      // päivitetään laskurit
      j *= -1;
      i++;

  }
  while(valmis !== true)
  //while(i < maxNumberOfPaginationLinks && valmis !== true)

  return indexes.sort((a,b) => a - b);
}

/*
 * Sivutuslinkkien alustus
 * - selvitetään mitkä sivut on pitää näyttää tulostettavassa Pagination listauksessa
 * - muotoillaan linkit.
 */
export const getPaginationLinks = (currentPage, maxNumberOfPaginationLinks, totalPages) => {
    
    let indexes = getPaginationIndexes(currentPage, maxNumberOfPaginationLinks, totalPages);

    indexes = indexes.map((index,i) => {

        let linkLabel = index;
        let linkIindex = index;
        let linkClass = "numb";

        /*
         * Korjataan tarvittaessa ensimmäinen linkki osoittamaan ensimmäiselle sivulle
         */
        if((i) === 0){
            if(index > 1) {
                linkIindex = 1
                linkLabel = <SiFirst />
                linkClass = "btn prev"
            }
        }

        /*
         * Korjataan tarvittaessa viimeinen linkki osoittamaan viimeiselle sivulle
         */
        if((i+1) === maxNumberOfPaginationLinks){
            if(index < totalPages) {
                linkIindex = totalPages
                linkLabel = <SiLastpass />
                linkClass = "btn next"
            }
        }

        /* Aktiivisen sivun korostus */
        if(index === currentPage)
            linkClass="numb active"


        return {
            className: linkClass,
            index: linkIindex,
            label: linkLabel
        }
    })


    return indexes
}


/*
 * Suodatuksen yleisversio
 * 
 * - haku kohdistuu ainoastaan nimeen
 */
export const getPresentedItemsList = (allTheItems, search ,sortingField, sortingOrder) => {

    let computedItems = allTheItems;

    /*
     * Haku
     * - kohdistuu nimeen
     */
    if(search) {

        computedItems = computedItems.filter(item => {

            return (
                item.name.toLowerCase().includes(search.toLowerCase()) 
            )

        })

    }

    /*
     * Lajittelu
     */
    if(sortingField){
        const reversed = sortingOrder === "asc" ? 1 : -1;

        // Immer ei tykkää sort -funktion käytöstä....
        let shallowCopy = computedItems.slice();

        shallowCopy.sort((a,b) => {

            let val;

            switch (sortingField) {
                case "name":
                  val = reversed * a[sortingField].localeCompare(b[sortingField])
                  break;
                default:
                    val =  reversed * ((a[sortingField] > b[sortingField]) ? 1 : (a[sortingField] < b[sortingField]) ? -1 : 0)
              }

            return(val)
        })

        computedItems = shallowCopy

    }

    return computedItems;    
}

/*
 * Sivulla näytettävät objektit, kun sivutus otetaan huomioon.
 */
export const getVisibleItems = (itemsUpToLevel, currentPage, itemsPerPage) => {

  return itemsUpToLevel.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage
  );

}

/*
 * Desimaalifunktion pyöristämisessä käyettävä apufunktio
 *
 * Lähde:
 * ---------------------------------------------------------------------------------------------
 * How do you round to 1 decimal place in Javascript?
 * https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
 */
export const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

/*
 * Check if a JavaScript string is a URL
 * https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 */
export const validURL = (str) => {

    var pattern = new RegExp('^(https?:\\/\\/)?'+           // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+   // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+                        // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+                    // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+                           // query string
      '(\\#[-a-z\\d_]*)?$','i');                            // fragment locator

    return !!pattern.test(str);
}

export const posterUrl = (src) => {
  return `http://www.tahtisadetta.fi/posters/${src}`;
}
