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
            --blue: #06379d;
            
        }
        #league {
            display:flex;
            overflow-x: auto; 
            
        }

        

        .event_data {
            
            
            margin: 5px;
            padding: 5px;
            border-radius: 12px;
            background: #ffffff;
            color: #000000;
            min-width: 367px;
            height: 263px;
            box-shadow: 3px 2px 4px rgba(0, 0, 0, 0.2);
            color: var(--blue);
            position: relative;
            
            
            
        }
        .event_name {
            font-weight: 800;
            font-size: 14px;
            margin: 15px 15px;
            max-width: 200px; 
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            
        }
        .event_date {
            margin: 20px 15px 10px;
            display: block;
            font-size: 13px;
            position: absolute;
            top: 0;
            right: 0;
            
            
         }

        .bet_offers {
            display: grid;
            grid-auto-rows: 1fr;
            grid-template-columns: 1fr 1fr 1fr;
            text-transform: uppercase  ;
            overflow: hidden;
            text-overflow: ellipsis;
            
            margin-bottom: 20px;
            font-weight: 550;
            font-size: 12px;
            
            
        }
        a { 
            background-color: #e9e9e9;
            text-decoration: none;
            width: 60px; 
            color: var(--blue);
            font-size: bold;
            display:block;
            padding: 18px;
            border-radius: 6px;
            text-align: center;
            margin: 0 10px;
            font-weight: 900;
            transition: 300ms;
            box-shadow: 3px 2px 4px rgba(0, 0, 0, 0.2);
            
        }

        a:hover {
            background-color: #dce9fc;
            
        }
        

        .outcome_name {
            
            margin: 15px 0px;
            max-width: 120px; 
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 800;
            
        }

        .outcome_odds{
            margin-bottom:15px
            

        }

        .outcome_shirts{
            margin-left:19%;
            

        }

        

        img {
            width: 76px;
            height: 84px;
        }

        .draw{
            margin-top: 101px;
        }

        button {
            
            margin-left: 5px;
            
            background-color: var(--blue);
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.5s ease-in-out;
            border: 3px solid var(--blue);
        }
        button img {
            width: 40px;
            height: 50px;
            transition: 400ms;
            
        }
        button img:hover {
            transform: rotate(180deg);
            
        }

        button:hover{
            
            
           
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

        this.stylesChanged = false; //to control de styles

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

        const $container = document.createElement('div');
        $container.style.position = 'relative';
        $container.innerText = 'Inglaterra - Premier League';
        $container.style.marginLeft = '5px';
        $container.style.marginBottom = '20px';
        $container.style.fontSize = '25px';
        $container.style.fontWeight = '600';
        $container.style.color = '#06379d';

        const imageUrls = [
            'icons/table.png',
            'icons/slider.png',
            // Add more image URLs as needed
        ];

        let currentImageIndex = 0;

        const $container2 = document.createElement('div');
        $container2.style.position = 'relative';

        // Add button to container
        const $button = document.createElement('button');

        const $img = document.createElement('img');
        $img.src = imageUrls[currentImageIndex];
        $button.appendChild($img);
        $button.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % imageUrls.length; // Update the image index
            $img.src = imageUrls[currentImageIndex];
            this.changeStyles();
        });
        
        $container2.appendChild($button);

        // Add #league to container
        this.$league = this._shadowRoot.querySelector('#league');
        $container2.appendChild(this.$league);

        // Add to container to shadow DOM
        this._shadowRoot.appendChild($container);
        this._shadowRoot.appendChild($container2);

    }

    changeStyles() {

        if (!this.stylesChanged) {
            this.$league.style.display = 'flex';
            this.$league.style.flexWrap = 'wrap';

            const windowWidth = window.innerWidth;
            const isMobile = windowWidth <= "768px";
            const isMobile2 = windowWidth >= "900px";
            const isMobile3 = windowWidth <= "1000px";


            const eventItems = this.$league.querySelectorAll('.event_data');
            eventItems.forEach(item => {
                item.style.width = 'calc(50% - 20px)';
                item.style.minWidth = '470px';
                item.style.flexGrow = 1;
            });

            const eventName = this.$league.querySelectorAll('.event_name');
            eventName.forEach(item => {
                item.style.fontSize = isMobile ? '14px' : '18px';
                item.style.whiteSpace = isMobile ? 'nowrap' : 'normal';
                item.style.maxWidth = isMobile ? '150px' : '350px';

            });

            const outcomeDate = this.$league.querySelectorAll('.event_date');
            outcomeDate.forEach(item => {
                item.style.fontSize = isMobile ? '13px' : '16px';
            });

            const outcomeNames = this.$league.querySelectorAll('.outcome_name');
            outcomeNames.forEach(item => {
                item.style.marginLeft = '16%';
                item.style.textOverflow = 'ellipsis';
                item.style.whiteSpace = isMobile ? 'nowrap' : 'normal';
                item.style.maxWidth = '150px';
            });

            const outcomeShirt = this.$league.querySelectorAll('.outcome_shirts');
            outcomeShirt.forEach(item => {
                item.style.marginLeft = isMobile ? '36%' : '33%';
                item.style.marginLeft = isMobile2 ? '28%' : '33%';
                item.style.marginLeft = isMobile3 ? '20%' : '29%';
            });



            const outcomeOdds = this.$league.querySelectorAll('.outcome_odds');
            outcomeOdds.forEach(item => {
                item.style.marginLeft = '21%';



            });
            this.stylesChanged = true;
        } else {
            this.$league.style.display = '';
            this.$league.style.flexWrap = '';

            const eventItems = this.$league.querySelectorAll('.event_data');
            eventItems.forEach(item => {
                item.style.width = '';
                item.style.minWidth = '';
                item.style.flexGrow = '';
            });

            const eventName = this.$league.querySelectorAll('.event_name');
            eventName.forEach(item => {
                item.style.fontSize = '';
                item.style.whiteSpace = '';
                item.style.maxWidth = '';
            });

            const outcomeDate = this.$league.querySelectorAll('.event_date');
            outcomeDate.forEach(item => {
                item.style.fontSize = '';
            });

            const outcomeNames = this.$league.querySelectorAll('.outcome_name');
            outcomeNames.forEach(item => {
                item.style.marginLeft = '';
                item.style.textOverflow = '';
                item.style.whiteSpace = '';
                item.style.maxWidth = '';
            });

            const outcomeShirt = this.$league.querySelectorAll('.outcome_shirts');
            outcomeShirt.forEach(item => {
                item.style.marginLeft = '';
            });

            const outcomeOdds = this.$league.querySelectorAll('.outcome_odds');
            outcomeOdds.forEach(item => {
                item.style.marginLeft = '';
            });

            this.stylesChanged = false;
        }
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

            // Format in "dd/mm/yyyy hh:mm"
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




                    //
                    const $outcomeName = document.createElement('div');
                    $outcomeName.className = "outcome_name";
                    const teamValue = $outcome.className === "home" ? "home" : "away";
                    const teamName = event[`${teamValue}Name`]?.toLowerCase().replace(/\s/g, '-') || '';
                    const outcomeText = this.getOutcomeText(event, outcome);

                    const words = outcomeText.split(' ');
                    const outcomeText2 = words.slice(-2).join(' ');

                    if ($outcome.className !== "draw") {
                        // Crear un elemento <br> para el salto de línea
                        const $breakLine = document.createElement('br');
                        // Añadir el nombre del equipo y el salto de línea al contenido de $outcomeName
                        $outcomeName.innerHTML = `${teamName}<br>${outcomeText2}`;
                    } else {
                        $outcomeName.innerHTML = `${outcomeText}`;
                    }



                    //Home or away shirt

                    const imageUrlFinal = `https://lancebet-com-prod.eyasgaming.net/content/dam/eyas-web/images/team-colours/football/england/${teamName}-${teamValue}.png`

                    const imageUrlFinalAux = `https://lancebet-com-prod.eyasgaming.net/content/dam/eyas-web/images/team-colours/football/generic-${teamValue}.png`;



                    //shirts on the screen


                    if ($outcome.className !== "draw") {
                        const $greetingDiv = document.createElement('div');
                        $greetingDiv.className = "outcome_shirts";
                        const $teamImage = document.createElement('img');
                        $teamImage.src = imageUrlFinal;
                        $teamImage.onerror = () => {
                            // If an error exist use URL alternative
                            $teamImage.src = imageUrlFinalAux;
                        };
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