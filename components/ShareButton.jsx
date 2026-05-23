"use client";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    EmailIcon,
    WhatsappIcon,
    EmailShareButton
} from 'react-share'

const ShareButtons = ({property}) => {

    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`


    return ( <div>
        <>
            <h3 className="font-bold text-xl text-center pt-2">
                Share This Property : 
            </h3>
            <div className="flex gap-3 justify-center pb-5">
                <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`#${property.type.replace(/\s/g,'')}ForRent`} >
                    <FacebookIcon size={40} round={true} />
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl} title={property.name} hashtags={[`${property.type.replace(/\s/g,'')}ForRent`]} >
                    <TwitterIcon size={40} round={true} />
                </TwitterShareButton>

                <WhatsappShareButton url={shareUrl} title={property.name} seperator='::' >
                    <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>

                <EmailShareButton
                    url={shareUrl}
                    subject={`Property Listing: ${property.name}`}
                    body={`Check out this property listing: ${shareUrl}`}
                >
                    <EmailIcon size={40} round={true} />
                </EmailShareButton>
            </div>
        </>
    </div> );
}
 
export default ShareButtons;