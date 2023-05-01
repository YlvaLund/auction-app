// src/pages/Auctions.js
import React, { useState, useEffect } from "react";
import "./Auctions.scss";
import { Link } from "react-router-dom";
import { getAuctions } from "../utils/auctions";

function Auctions() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    // Fetch auctions data from API
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    // Replace with your API endpoint
    const response = await getAuctions();
    setAuctions(response?.data ?? []);
  };

  return (
    <div className="auctions-page">
      <div className="auctions-container">
        {auctions.map((auction) => {
          console.log(auction);
          if (typeof auction?.media[0] === "undefined") {
            // Without an image we do not want to dispaly this.
            return <></>;
          }
          let auctionTags = [];
          if (auction?.tags?.length > 0) {
            for (let i = 0; i < auction.tags.length; i++) {
              auctionTags.push(
                <span className="auction__tag" key={auction.tags[i].id}>
                  {auction.tags[i]}
                </span>
              );
            }
          }

          let descriptionText = auction.description;
          if (descriptionText?.length > 85) {
            descriptionText = descriptionText.slice(0, 83) + "...";
          }
          return (
            <div key={auction.id} className="auction-card">
              <img src={auction.media[0]} alt={auction.title} />
              <h3>{auction.title}</h3>
              <p>{descriptionText}</p>
              <div>
                <Link to={`/auction/${auction.id}`}>
                  <button>View Auction</button>
                </Link>
                <div className="auction__tag__container">{auctionTags}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Auctions;
