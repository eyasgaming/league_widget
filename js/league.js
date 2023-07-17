const template = document.createElement('template');

/****
 * 
 * usage:    <league-events leagueId="1000094985" loadingText="Loading..." drawText="draw" winText="to win">No Matches currently avaliable</league-events>
 *
 ***/

template.innerHTML = `
    <style>
        :root {
            --green: #00b925; 
            --blue: #06379d:
            
        }
        #league {
            display:flex;
            overflow-x: auto; 
            
        }

        

        .event_data {
            
            border: 1px solid var(--green);
            margin: 5px;
            padding: 5px;
            border-radius: 12px;
            background: #ffffff;
            color: #000000;
            min-width: 500px;
            box-shadow: 3px 2px 4px rgba(0, 0, 0, 0.2);
            
            
            
        }
        .event_name {
            font-weight: bold;
            font-size: 1em;
            margin: 15px 15px;
            
        }
        .event_date {
            margin: 5px 15px;
            display: block;
            font-size: 12px;
            
            
         }

        .bet_offers {
            display: grid;
            grid-auto-rows: 1fr;
            grid-template-columns: 1fr 1fr 1fr;
            text-transform: uppercase  ;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
            margin-bottom: 20px;
            font-weight: 550;
            font-size: 12px;
            
            
        }
        a { 
            background-color: #e9e9e9;
            text-decoration: none;
            color: var(--green);
            font-size: bold;
            display:block;
            padding: 18px;
            border-radius: 6px;
            text-align: center;
            margin: 0 10px;
            transition: 300ms;
            box-shadow: 3px 2px 4px rgba(0, 0, 0, 0.2);
        }

        a:hover {
            background-color: #f3f2d0;
            
        }
        

        .outcome_name {
            margin: 15px 0;
            display: -webkit-box;
            -webkit-line-clamp: 1; /* Número máximo de líneas a mostrar */
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            
        }

        img {
            max-width: 100px;
        }

        .draw{
            margin-top: 120px;
        }

    </style>
    <div id ="league" >
    
    </div>
  `

class League extends HTMLElement {

    // You can edit these:
    prod = false;
    affiliateId = "AN2548500601"

    // Do not edit anyething below this line
    nonProdUrl = "https://graphql.cts.kambicdn.com"
    prodUrl = "https://graphql.kambicdn.com"

    nonProdTarget = "https://lancebet-com-uat.eyasgaming.net/home"
    prodTarget = "https://www.lancebetting.com/home"

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.url = this.prod ? this.prodUrl : this.nonProdUrl;
        this.target = this.prod ? this.prodTarget : this.nonProdTarget;

        //  this.leagueId = this.getAttribute('leagueId');
    }


    get leagueId() {
        return this.getAttribute('leagueId');
    }

    get winText() {
        return this.getAttribute('winText');
    }

    get drawText() {
        return this.getAttribute('drawText');
    }

    get loadingText() {
        return this.getAttribute('loadingText');
    }


    connectedCallback() {
        this.$league = this._shadowRoot.querySelector('#league');
        this.$league.innerHTML = this.loadingText;
        //   this.$odds.href = this.target + "?affiliateId=" + this.affiliateId // default url in case no odds found.
        this.getEvents(this.leagueId);
    }




    getEvents(leagueId) {
        const data = JSON.stringify({
            query: `
            query Event {
                event(
                    offering: "eyasgamingbr"
                    market: "BR"
                    groupId:` + leagueId + `
                    onlyMain: true
                ) {
                    events {
                        id
                        englishName
                        groupId
                        state
                        betOffers {
                            id
                            betOfferType {
                                id
                                englishName
                                name
                            }
                            outcomes {
                                id
                                englishLabel
                                odds
                                participant
                                label
                                prevOdds
                                betOfferId
                                oddsFractional
                                oddsAmerican
                                status
                                cashOutStatus
                                homeScore
                                awayScore
                                occurrence {
                                    occurrenceType
                                    occurrenceTypeLabel
                                }
                            }
                            suspended
                            closed
                            criterion {
                                englishLabel
                                id
                                lifetime
                            }
                        }
                        name
                        homeName
                        awayName
                        start
                        group
                        score {
                            home
                            away
                            info
                            who
                        }
                    }
                }
            }`
        });



        const response = fetch(
            this.url,
            {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length,
                    Authorization:
                        'eyas_gaming',
                },
            }
        ).then((response) => response.json())
            .then((data) => this.renderLeage(data.data.event.events))
            .catch((error) => this.$league.innerHTML = this.textContent);
    }

    renderLeage(events) {

        if (events == null) {
            this.$league.innerHTML = this.textContent;
            return;
        }

        this.$league.innerHTML = "";

        events.forEach((event) => {
            const $event = document.createElement('div');
            $event.className = "event_data";

            const $eventTitle = document.createElement('span');
            $eventTitle.innerHTML = event.name;
            $eventTitle.className = "event_name";
            $event.appendChild($eventTitle);


            var localDate = new Date(event.start);
            const day = localDate.getDate();
            const month = localDate.getMonth() + 1;
            const year = localDate.getFullYear();
            const hour = localDate.getHours();
            const min = localDate.getMinutes();

            // Formateas la fecha y la hora en el formato "dd/mm/yyyy hh:mm"
            const date = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;


            const $eventDate = document.createElement('span');
            $eventDate.innerHTML = date.toLocaleString();
            $eventDate.className = "event_date";
            $event.appendChild($eventDate);



            event.betOffers.forEach((betOffer) => {


                const $betOffer = document.createElement('div');
                $betOffer.className = "bet_offers";

                betOffer.outcomes.forEach((outcome) => {

                    const $outcome = document.createElement('div');
                    $outcome.className = this.getOutcomeDivName(outcome);


                    const $outcomeName = document.createElement('div');
                    $outcomeName.className = "outcome_name";
                    $outcomeName.innerHTML = this.getOutcomeText(event, outcome);

                    //Choosing Home or Away team

                    const teamValue = $outcome.className === "home" ? "home" : "away";

                    //

                    const teamName = event[`${teamValue}Name`]?.toLowerCase().replace(/\s/g, '-') || '';

                    //Home or away shirt

                    const imageUrlFinal = `https://lancebet-com-prod.eyasgaming.net/content/dam/eyas-web/images/team-colours/football/england/${teamName}-${teamValue}.png`;



                    //shirts on the screen
                    

                    if ($outcome.className !== "draw") {
                        const $greetingDiv = document.createElement('div');
                        $greetingDiv.className = "outcome_shirts";
                        const $teamImage = document.createElement('img');
                        fetch(imageUrlFinal)
                            .then(response => {
                                if (!response.ok) {
                                    
                                    $teamImage.src = "https://lancebet-com-prod.eyasgaming.net/content/dam/eyas-web/images/team-colours/football/generic-away.png" ;
                                } else {
                                    $teamImage.src = imageUrl;
                                }
                            })
                            .catch(error => {
                                // En caso de error, también usar la URL de imagen genérica
                                $teamImage.src = "https://lancebet-com-prod.eyasgaming.net/content/dam/eyas-web/images/team-colours/football/generic-away.png";
                            });
                        
                        $greetingDiv.appendChild($teamImage);
                        $outcome.appendChild($greetingDiv);

                    }


                    const $outcomeOdds = document.createElement('div');
                    $outcomeOdds.className = "outcome_odds";

                    const $outcomeLink = document.createElement('a');
                    $outcomeLink.href = this.target + "?affiliateId=" + this.affiliateId + "&coupon=single|" + outcome.id + "||append|lance";
                    $outcomeLink.innerText = (Number(outcome.odds) / 1000).toFixed(2).toLocaleString();
                    $outcomeLink.target = "lancebet";




                    $outcomeOdds.appendChild($outcomeLink);
                    $outcome.appendChild($outcomeName);

                    $outcome.appendChild($outcomeOdds);
                    $betOffer.appendChild($outcome);
                });
                $event.appendChild($betOffer);
            });
            this.$league.appendChild($event);
        });
    }

    renderPrice(price) {
        console.log("prod: " + this.prod)
        console.log("url: " + this.url)
        console.log("target: " + this.target)

        this.$odds.innerHTML = (Number(price) / 1000).toFixed(2).toLocaleString();
        this.$odds.href = this.target + "?affiliateId=" + this.affiliateId + "&coupon=single|" + this.id + "||append|lance";
    }

    getOutcomeDivName(outcome) {
        if (outcome.englishLabel == "1") {
            return "home";
        }
        else if (outcome.englishLabel == "X") {
            return "draw";
        }
        else if (outcome.englishLabel == "2") {
            return "away";
        }
    }  // getOutcomeDivName

    getOutcomeText(event, outcome) {
        if (outcome.englishLabel == "1") {
            return event.homeName + " " + this.winText;
        }
        else if (outcome.englishLabel == "X") {
            return this.drawText
        }
        else if (outcome.englishLabel == "2") {
            return event.awayName + " " + this.winText;
        }

    }


}







window.customElements.define('league-events', League);