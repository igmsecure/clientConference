import React from 'react';
import { Link } from 'react-router-dom';
import draftCartSvg from "./Navbar/icons/draftIcons.svg";


interface DraftCartProps {
    articleID: number;
}

const DraftCart: React.FC<DraftCartProps> = ({ articleID }) => {
    return (
        <Link to={`/article/${articleID}`}>
            <div className="draft-cart">
                <button
                    className="draft-cart-button"
                    disabled={articleID === 0}
                    style={{ backgroundColor: articleID === 0 ? '#d6d3d388' : 'white' }}
                >
                    <img className="draft-cart-img" src={draftCartSvg} alt="Cart" />
                </button>
            </div>
        </Link>
    );
};

export default DraftCart;
