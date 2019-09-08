import React,{Component} from 'react';

import './Redditmeme.css';


import RedditLogo from '../../assets/reddit_icon.png'
import Facebook_icon from '../../assets/facebook_logo.png'
import Leftarrow from '../../assets/leftarrow.png'
import Rightarrow from '../../assets/rightarrow.png'

import MemeWindowMaker from '../memeWindowMaker/memeWindowMaker'

import axios from 'axios';

class Redditmemes extends Component{
    state={
        MainLinkandSite:{
            site:null,
        },
        MemesData:{
            redditMemes:{
                isLoaded:false,
                imgURL:null
            },
            facebookMemes:{
                isLoaded:false,
                imgURL:null
            }
        },
        wantToDisplay:[false,false],
        redditMemeNumber: 0,
        facebookMemeNumber:0
    }

    fetchTopFiveReddit = async (name,sub,imageNumber) =>{
        const URL = `https://www.reddit.com/r/${sub}/top/.json?limit=10`;

        const fetchResult = fetch(URL)
        const response = await fetchResult;
        
        if(response.ok){
            
            const change = !this.state.wantToDisplay[0]

            const jsonData = await response.json();
            //console.log(jsonData)
            this.setState(prevState =>({
                MainLinkandSite:{
                    site:'Reddit',
                }
            })
                // MainLinkandSite:{
                //     site:'Reddit'
                // }
            )
            console.log()
            const UpdatedMemesData = {...this.state.MemesData};
            const UpdatedRedditMemes = UpdatedMemesData.redditMemes;
            if(jsonData){
                UpdatedRedditMemes.isLoaded = true;
                UpdatedRedditMemes.imgURL = jsonData.data.children[imageNumber].data.url;
                UpdatedMemesData.redditMemes =  UpdatedRedditMemes; 
                this.setState({
                    MemesData:UpdatedMemesData
                })
            }
            
            if(this.state.MemesData.redditMemes.isLoaded &&(!this.state.wantToDisplay[0]||name=='boxText')){
                //console.log(this.state.wantToDisplay)
                const WTDarray = this.state.wantToDisplay
                WTDarray[0] = !WTDarray[0];
                WTDarray[1] = false;
                //console.log(WTDarray)
                this.setState({
                    wantToDisplay:WTDarray
                })
            }
            
            
            console.log(this.state);
            
            
            
            
        }else{
            throw Error(response.statusText);
        }
    }
//NOT USING RIGHT NOW
    fetchTopFiveFacebook = async () =>{
        const URL = 'https://www.facebook.com/photo.php?fbid=2074821392569767&set=gm.278569219480036&type=3&theater&ifg=1';

        const fetchResult = fetch(URL)
        const response = await fetchResult;

        if(response.ok){
            const jsonData = await response.json();
            console.log(jsonData);
            
            
        }else{
            throw Error(response.statusText);
        }
    }

    componentDidMount(){
        //this.fetchTopFiveReddit('dankmemes')
        //this.fetchTopFiveFacebook()

    }

    redditMemesFetchHandler = (event)=>{
        
        const name = event.target.className  ;
        this.fetchTopFiveReddit(name,'dankmemes',this.state.redditMemeNumber);
    }
/////NOT HANDLED YET
    facebookMemeFetchHandler = ()=>{
        if(this.state.MemesData.facebookMemes.isLoaded){
            //console.log(this.state.wantToDisplay)
            const WTDarray = this.state.wantToDisplay
            WTDarray[1] = !WTDarray[1];
            WTDarray[0] = false;
            console.log(WTDarray)
            this.setState({
                wantToDisplay:WTDarray
            })
        }
    }

    reducer=(total,value)=>{
        return total||value
    }

    imageChangeHandler =(event)=>{
        console.log(event.target.className)
        const name  = event.target.className;
        if(this.state.MainLinkandSite.site === 'Reddit'){
            // this.setState({ dealersOverallTotal: total }, () => {
            //     console.log(this.state.dealersOverallTotal, 'dealersOverallTotal1');
            //   }); 
            if(event.target.className === 'RightArrow'){
                const newNumber =  (this.state.redditMemeNumber + 1)%10;
                this.setState({redditMemeNumber:newNumber},()=>{this.fetchTopFiveReddit(name,'dankmemes',newNumber)})
                
            }
            else{
                let newNumber = 0 ;
                (this.state.redditMemeNumber - 1) == -1 ? newNumber = 4 : newNumber = (this.state.redditMemeNumber-1)%10;
                console.log(newNumber)
                this.setState({redditMemeNumber:newNumber},()=>{this.fetchTopFiveReddit(name,'dankmemes',newNumber)})
            }

            //this.fetchTopFiveReddit('dankmemes',this.state.redditMemeNumber);
            

        }
    }

    render(){
        let redditmemesection = null;
        if(this.state.wantToDisplay.reduce(this.reducer,false)){
            
            //redditmemesection = <div>Hello</div>;
            
            if(this.state.wantToDisplay[0] && this.state.MemesData.redditMemes.isLoaded===true){
                redditmemesection =( 
                    <div>
                        <img src={Leftarrow} className="LeftArrow" onClick={(event)=>this.imageChangeHandler(event)} />
                        <img src = {this.state.MemesData.redditMemes.imgURL} width='500px' height='500px' />
                        <img src={Rightarrow} className="RightArrow" onClick={(event)=>this.imageChangeHandler(event)} />
                    </div>
                )
            }
        }
        return(
            <div>
                <MemeWindowMaker source={RedditLogo} clicked={(event)=>this.redditMemesFetchHandler(event)} typeOfMeme="Reddit Memes"/>
                <MemeWindowMaker source={Facebook_icon} clicked={(event)=>this.facebookMemeFetchHandler(event)} typeOfMeme="Facebook Memes"/>
                
                   
                    {redditmemesection}
                    
                
            </div>
        )
    }
}

export default Redditmemes;