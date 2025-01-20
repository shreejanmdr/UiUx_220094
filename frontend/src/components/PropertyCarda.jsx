import React, { useState } from "react";
import { property, truncate } from "lodash";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { addToWishlistApi, removeFromWishlistApi } from "../apis/Api";
import { toast } from "react-toastify";
import "./PropertyCarda.css";

const PropertyCard = ({ card }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    setError(null);
    try {
      if (isInWishlist) {
        await removeFromWishlistApi(card._id);
        toast.success("Property removed from wishlist");
      } else {
        await addToWishlistApi(card._id);
        toast.success("Property added to wishlist");
      }
      setIsInWishlist(!isInWishlist);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div 
      className="property-card"
      onClick={() => navigate(`/homepage/view/${card._id}`)}
    >
      <div className="property-image-container">
        <img
          src={`http://localhost:5000/property/${card.propertyImage}`}
          alt={`${card.propertyImage}`}

          className="property-image"
        />
        <div className="image-overlay">
          <span className="category-badge">{card.propertyCategory}</span>
          <button
            className="wishlist-btn"
            onClick={handleWishlistToggle}
            aria-label="Add to wishlist"
          >
            <FaHeart className={`heart-icon ${isInWishlist ? 'active' : ''}`} />
          </button>
        </div>
      </div>

      <div className="property-details">
        <div className="price-container">
          <span className="price">
            <span className="currency">Rs </span>
            {card.propertyPrice.toLocaleString()}
          </span>
          {card.propertyStatus && (
            <span className="status-badge">
              {card.propertyStatus}
            </span>
          )}
        </div>

        <h3 className="property-title">
          {truncate(card.propertyTitle, { length: 30 })}
        </h3>

        <p className="property-description">
          {truncate(card.propertyDescription, { length: 100 })}
        </p>

        <div className="location">
          <MdLocationOn className="location-icon" />
          <span>{truncate(card.propertyLocation || 'Location unavailable', { length: 40 })}</span>
        </div>

      </div>
    </div>
  );
};

export default PropertyCard;