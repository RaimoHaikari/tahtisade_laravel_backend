import React from 'react';

import {
    CONTAINER,
    H1,
    TABLE,
    TBODY,
    TR,
    TD,
    SPAN,
    LINKKI    
} from './moviecardElements';

const MovieCard = ({actors, directors, distributors, externalLinks, genre, releaseDate, title, writers}) => {

    const getDayStr = (dateObj) => {

        // eslint-disable-next-line default-case
        switch(dateObj.getDay()) {
            
            case 0:
                return 'Su';
            case 1:
                return 'Ma';
            case 2:
                return 'Ti';
            case 3:
                return 'Ke';
            case 4:
                return 'To';
            case 5:
                return 'Pe';
            case 6:
                return 'La';
        }       

    };

    const getReleaseDateStr = () => {

        const eiDate = new Date(releaseDate);
        const strEI = `${getDayStr(eiDate)} ${eiDate.getDate()}.${eiDate.getMonth()+1}.${eiDate.getUTCFullYear()}`;
        return strEI;

    }


    const getExternaLinks = () => {

        if(externalLinks.length === 0)
            return null;

        return (
            <TR>
                <TD className="movieCardTitle">Lisätietoa</TD>
                <TD>
                    {
                        externalLinks.map((link, index) => {

                            return(
                                <LINKKI 
                                    href={link.link}
                                    key={index}
                                    backgroundColor={link.bgColor}
                                    color={link.color}
                                    target="_blank"
                                >
                                    {link.name}
                                </LINKKI>
                            )
                        })
                    }
                </TD>
            </TR> 
        )
    }

    /*
     * Kavi api:sta luetuan data tulostus
     * - esim. näyttelijät, ohjaajat...
     */
    const writeKaviData = (title, data) => {
        return (
            <TR>
                <TD className="movieCardTitle">{title}</TD>
                <TD className="movieCardList">
                    {
                        data.map(d =>  <SPAN key={d.kaviID}>{d.nimi}</SPAN>)
                    }
                </TD>
            </TR>            
        )
    }


    return (
        <CONTAINER>
            <H1>{title}</H1>
            <TABLE>
                <TBODY>
                    {writeKaviData("Näyttelijät", actors)}
                    {writeKaviData("Ohjaus", directors)}
                    {writeKaviData("Käsikirjoitus", writers)}
                    {writeKaviData("Jakelija", distributors)} 
                    <TR>
                        <TD className="movieCardTitle">Genre</TD>
                        <TD className="movieCardList">
                            {
                                genre.map(g =>  <SPAN key={`key_${g.genre}`}>{g.genre}</SPAN>)
                            }
                        </TD>
                    </TR>  
                    <TR>
                        <TD className="movieCardTitle">Ensi-ilta</TD>
                        <TD>
                            {
                                getReleaseDateStr()
                            }
                        </TD>
                    </TR>
                    {getExternaLinks()}
                </TBODY>
            </TABLE>           
        </CONTAINER>
    );
};

export default MovieCard;