import React from "react";
import { Link } from "react-router-dom";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import {
  MdDashboard,
  MdExpandMore,
  MdImportExport,
  MdPostAdd,
  MdAdd,
  MdPeople,
  MdRateReview,
} from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sidebar px-12 py-8">
      <Link to="/admin/dashboard">
        <p className="flex items-center py-6 gap-2 text-slate-600 hover:text-slate-900 hover:translate-x-3 hover:scale-105 duration-200">
          <MdDashboard /> Dashboard
        </p>
      </Link>
      <Link className="flex items-center py-6 text-slate-600 hover:text-slate-900 hover:translate-x-3 hover:scale-105 duration-200">
        <SimpleTreeView
          defaultcollapseicon={<MdExpandMore />}
          defaultexpandicon={<MdImportExport />}
        >
          <TreeItem itemId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem itemId="2" label="All" />
            </Link>

            <Link to="/admin/product">
              <TreeItem
                itemId="3"
                label="Create"
                IconComponent={<MdLibraryBooks />}
              />
            </Link>
          </TreeItem>
        </SimpleTreeView>
      </Link>
      <Link to="/admin/orders">
        <p className="flex items-center py-6 gap-2 text-slate-600 hover:text-slate-900 hover:translate-x-3 hover:scale-105 duration-200">
          <FaRegListAlt />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p className="flex items-center py-6 gap-2 text-slate-600 hover:text-slate-900 hover:translate-x-3 hover:scale-105 duration-200">
          <MdPeople /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p className="flex items-center py-6 gap-2 text-slate-600 hover:text-slate-900 hover:translate-x-3 hover:scale-105 duration-200">
          <MdRateReview />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
