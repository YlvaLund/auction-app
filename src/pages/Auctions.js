// src/pages/Auctions.js
import React, { useState, useEffect } from "react";
import "./Auctions.scss";
import { Link } from "react-router-dom";
import { getAuctions } from "../utils/auctions";
import { getUserDetails } from "../utils/token";

function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [userName, credits] = getUserDetails();
  const [showAuctionDetails, setShowAuctionDetails] = useState(false);
  const [auctionDetails, setAuctionDetails] = useState({});

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
      <div className="auction__toolbar">
        <button
          onClick={() => {
            console.log("create new auction");
            setShowAuctionDetails(true);
          }}
        >
          + Add
        </button>
        <span>Filter search</span>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => {
            setFilterValue(e.target.value);
          }}
        />
        {tagFilter?.length > 0 && (
          <aside
            className="auction__tag"
            onClick={() => {
              setTagFilter("");
            }}
          >
            {tagFilter}
          </aside>
        )}
        {credits > 0 && (
          <div>
            <span>Credits: </span>
            <span>{credits}</span>
          </div>
        )}
      </div>
      {showAuctionDetails ? (
        <div>
          <h1>Auction!</h1>
          <div>{userName}</div>
          <input
            type="text"
            value={auctionDetails?.name ?? ""}
            onChange={(e) => {
              console.log(e);
              setAuctionDetails({ name: e.target.value });
            }}
          />
        </div>
      ) : (
        <div className="auctions-container">
          {auctions.map((auction) => {
            let descriptionText = auction?.description ?? "";
            if (descriptionText?.length > 85) {
              descriptionText = descriptionText.slice(0, 83) + "...";
            }
            // Filter logic.

            let auctionTags = [];
            if (auction?.tags?.length > 0) {
              for (let i = 0; i < auction.tags.length; i++) {
                // If tagfilter is set then only return the actual filterd tag.
                if (tagFilter?.length > 0) {
                  if (!auction?.tags[i].includes(tagFilter)) {
                    return <></>;
                  }
                }

                auctionTags.push(
                  <span
                    className="auction__tag"
                    key={auction.id + i}
                    onClick={() => {
                      setTagFilter(auction.tags[i]);
                    }}
                  >
                    {auction.tags[i]}
                  </span>
                );
              }
            } else {
              if (tagFilter?.length > 0) {
                return <></>;
              }
            }

            if (filterValue !== "") {
              if (descriptionText.toLowerCase().includes(filterValue.toLowerCase()) || auction?.title?.toLowerCase().includes(filterValue.toLowerCase())) {
                //
              } else {
                return <></>;
              }
            }
            if (typeof auction?.media[0] === "undefined") {
              // Without an image we do not want to dispaly this.
              return <></>;
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
      )}
    </div>
  );
}

export default Auctions;
