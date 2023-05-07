// src/pages/Auctions.js
import React, { useState, useEffect } from "react";
import "./Auctions.scss";
import { Link } from "react-router-dom";
import { getAuctions, createAuction } from "../utils/auctions";
import { getUserDetails } from "../utils/token";

function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [userName, credits] = getUserDetails();
  const [showAuctionDetails, setShowAuctionDetails] = useState(false);
  const [auctionDetails, setAuctionDetails] = useState({});
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    // Fetch auctions data from API
    fetchAuctions();
  }, [currentOffset]);

  const fetchAuctions = async () => {
    // Replace with your API endpoint
    const response = await getAuctions(currentOffset);
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
        <button
          id="previous"
          onClick={async () => {
            if (currentOffset > 99) {
              setCurrentOffset(currentOffset - 100);
            }
          }}
        >
          Previous
        </button>
        <button
          id="next"
          onClick={async () => {
            setCurrentOffset(currentOffset + 100);
          }}
        >
          Next
        </button>
      </div>
      {showAuctionDetails ? (
        <div className="create__auction">
          <h1>Auction!</h1>
          <div>{userName}</div>
          {/* {
  "title": "string",
  "description": "string",
  "endsAt": "2023-04-24T19:24:55.876Z",
  "tags": [
    "string"
  ],
  "media": "string"
} */}
          <label>
            Title
            <input
              type="text"
              value={auctionDetails?.title ?? ""}
              onChange={(e) => {
                setAuctionDetails({ ...auctionDetails, title: e.target.value });
              }}
            />
          </label>
          <label>
            Image Path
            <input
              type="text"
              value={auctionDetails?.media ?? ""}
              onChange={(e) => {
                setAuctionDetails({ ...auctionDetails, media: e.target.value });
              }}
            />
          </label>
          <label>
            Description
            <textarea
              type="text"
              value={auctionDetails?.description ?? ""}
              onChange={(e) => {
                setAuctionDetails({ ...auctionDetails, description: e.target.value });
              }}
            ></textarea>
          </label>
          <label>
            <span>Auction ends at:</span>
            <input
              type="datetime-local"
              value={auctionDetails?.endsAt ?? new Date()}
              onChange={(e) => {
                setAuctionDetails({ ...auctionDetails, endsAt: e.target.value });
              }}
            />
          </label>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              let inputValue = document.getElementById("newTag");
              let value = inputValue.value;
              console.log(value);
              let curentArray = auctionDetails?.tags ?? [];
              curentArray.push(value);
              setAuctionDetails({ ...auctionDetails, tags: curentArray });
            }}
          >
            <div>
              {auctionDetails?.tags?.map((t) => {
                return (
                  <span className="auction__tag" key={t}>
                    {t}
                  </span>
                );
              })}
            </div>
            <label>
              <span>Add Tag:</span>
              <input type="text" id="newTag" />
              <button type="submit">Add</button>
            </label>
          </form>

          <button
            onClick={async () => {
              console.log(auctionDetails);
              let inputObject = { ...auctionDetails };
              let media = [];
              media.push(auctionDetails.media);
              inputObject.media = media;
              const res = await createAuction(inputObject);
              if (res?.status === 201 || res?.status === 200) {
                alert("Auction created");
                setAuctionDetails({});
                setShowAuctionDetails(false);
              }
            }}
          >
            <span>Create NEW Auction!</span>
          </button>
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
