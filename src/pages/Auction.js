import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuction } from "../utils/auctions";
import "./Auction.scss";
import { getUserDetails } from "../utils/token";
import { setNewBid as sendNewBid } from "../utils/auctions";

function Auction() {
  const [auctionDetails, setAuctionDetails] = useState({});
  const [newBid, setNewBid] = useState(0);
  const { auctionId } = useParams();
  const [userName, credits] = getUserDetails();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function handleCountDown() {
      if (auctionDetails.endsAt?.length > 0) {
        let rightNow = new Date();
        let auctionEnds = new Date(auctionDetails.endsAt);
        if (auctionEnds.getTime() > rightNow.getTime()) {
          let difference = auctionEnds.getTime() - rightNow.getTime();
          // difference is in MS.
          var msec = difference;
          let days = Math.floor(msec / 1000 / 60 / 60 / 24);
          msec -= days * 1000 * 60 * 60 * 24;
          let hh = Math.floor(msec / 1000 / 60 / 60);
          msec -= hh * 1000 * 60 * 60;
          let mm = Math.floor(msec / 1000 / 60);
          msec -= mm * 1000 * 60;
          let ss = Math.floor(msec / 1000);
          msec -= ss * 1000;

          setCountdown({
            days: days,
            hours: hh,
            minutes: mm,
            seconds: ss,
          });
        }
      }

      setTimeout(handleCountDown, 1000);
    }

    handleCountDown();
  }, [auctionDetails?.endsAt]);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await getAuction(auctionId);
        if (res.status === 200) {
          setAuctionDetails(res.data);
        }
      } catch (er) {
        console.error(er);
      }
    };

    if (auctionId?.length > 0) {
      fetchAuction();
    }
    return setAuctionDetails({});
  }, [auctionId]);

  let allTags = [];
  for (let i = 0; i < auctionDetails?.tags?.length; i++) {
    allTags.push(<span className="auction__tag">{auctionDetails?.tags[i]}</span>);
  }

  let currentBid = 0;
  let currentBidText = "";
  if (auctionDetails?.bids?.length > 0) {
    for (let i = 0; i < auctionDetails.bids.length; i++) {
      // Asume that the highest bit not necessarily is the latest bid.
      if (auctionDetails.bids[i].amount > currentBid) {
        currentBid = auctionDetails.bids[i].amount;
        currentBidText = ",- By: " + auctionDetails.bids[i]?.bidderName;
      }
    }
  }

  return (
    <div>
      <div className="auction__specific__cointainer">
        {auctionDetails?.id && (
          <div className="auction__card">
            <img src={auctionDetails?.media[0]} alt={auctionDetails?.title} />
            <h1>{auctionDetails?.title}</h1>
            <p>{auctionDetails?.description}</p>
            <div className="auction__tag__container">{allTags}</div>
            <div className="auction__bid__toolbar">
              <div>
                Current bid: <span>{currentBid}</span> <span>{currentBidText}</span>
              </div>
              <div>
                <input
                  type="number"
                  value={newBid}
                  onChange={(e) => {
                    const tempBid = parseInt(e.target.value);
                    if (tempBid <= credits) {
                      setNewBid(tempBid);
                    }
                  }}
                />
                <button
                  onClick={async () => {
                    if (currentBid < newBid) {
                      const res = await sendNewBid(auctionDetails?.id, newBid);
                      console.log(res);
                    } else {
                      alert("You can not bid unless the new bid is higher than the current bid.");
                    }
                  }}
                >
                  Submit new bid
                </button>
                <div className="auction__countdown">
                  <div>
                    <h4>Days</h4>
                    <span>{countdown.days}</span>
                  </div>
                  <div>
                    <h4>Hours</h4>
                    <span>{countdown.hours}</span>
                  </div>
                  <div>
                    <h4>Minutes</h4>
                    <span>{countdown.minutes}</span>
                  </div>
                  <div>
                    <h4>Seconds</h4>
                    <span>{countdown.seconds}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auction;
