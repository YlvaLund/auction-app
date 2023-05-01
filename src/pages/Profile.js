import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllUsers, getUser } from "../utils/users";
import "./Profile.scss";

export default function Profile() {
  const [allProfiles, setAllProfiles] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [currentOffset, setCurrentOffset] = useState(0);
  const { name } = useParams();

  useEffect(() => {
    const getProfile = async () => {
      const res = await getUser(name);
      console.log(res);
      if (res?.data?.name?.length > 0) {
        setProfileData(res.data);
      }
    };

    if (name?.length > 0) {
      getProfile();
    }
  }, [name]);

  if (name?.length > 0) {
    return (
      <div className="profile__container">
        <div className="profileData__container">
          <h1>{profileData?.name}</h1>
          <div>
            <span>Email:</span>
            <span>{profileData?.email}</span>
          </div>
          <div>
            <span>Credits:</span>
            <span>{profileData?.credits}</span>
          </div>
        </div>

        <div className="profileData__listings">
          <h2>Listings</h2>
          <div className="listOfItems">
            {profileData?.listings?.map((item) => {
              return (
                <div className="listings__item" key={item.id}>
                  {item?.title}
                </div>
              );
            })}
          </div>
        </div>
        <div className="profileData__wins">
          <h2>Wins</h2>
          <div className="listOfItems">x</div>
        </div>
        <Link to="/profiles">Back</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Profiles</h1>
      <div className="profileViewer">
        {allProfiles?.map((value, index) => {
          return (
            <Link to={"/profiles/" + value.name} key={index} className="profileListing">
              <span>{value?.name ?? "na"}</span>
              <span>{value?.email ?? "na"}</span>
              <span>{value?.credits ?? 0}</span>
            </Link>
          );
        })}
        <button
          id="previous"
          onClick={async () => {
            const res = await getAllUsers(currentOffset);
            console.log(res);
            if (res?.data?.length > 0) {
              setAllProfiles(res.data ?? []);
              if (currentOffset > 99) {
                setCurrentOffset(currentOffset - 100);
              }
            }
          }}
        >
          Previous
        </button>
        <button
          id="next"
          onClick={async () => {
            const res = await getAllUsers(currentOffset);
            console.log(res);
            if (res?.data?.length > 0) {
              setAllProfiles(res.data ?? []);
              setCurrentOffset(currentOffset + 100);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}