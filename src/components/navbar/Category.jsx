import { Collapse } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { HashContext } from "../HashProvider";

const Category = ({ categoryItems }) => {
  const [expanded, setExpanded] = useState(false);
  const { updateHash } = useContext(HashContext);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };


  return (
    <li
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start !important",
        alignItems: "start !important",
      }}
    >
    <Link to={`/catalog#category-${categoryItems?.id}`} className="text-decoration-none">
        <p
            onClick={handleExpandClick}
            className="category-parent"
            // style={{ textAlign: "start !important" }}
        >
            {categoryItems?.title}{" "}
            {categoryItems?.subcategories?.length > 0 ? (
            <>{!expanded ? ">" : "<"}</>
            ) : (
            ""
            )}
        </p>
      </Link>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {categoryItems?.subcategories?.map((c, idx) => (
          <Link
            key={idx}
            to={`/catalog#category-${categoryItems.id}`}
            onClick={() => {
              updateHash(categoryItems.id);
            }}
            className="category-item"
            style={{ width: "100%", textAlign: "start !important" }}
          >
            123
            {c?.subcategory}
          </Link>
        ))}
      </Collapse>
    </li>
  );
};

export default Category;
