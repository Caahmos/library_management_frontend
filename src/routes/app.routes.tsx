import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Pages/Home";
import Layout from "../components/Layouts/Layout";
import Circulation from "../components/Pages/Circulation";
import Catalog from "../components/Pages/Catalog";
import Admin from "../components/Pages/Admin";
import Detail from "../components/Pages/Catalog/Detail";
import AdminList from "../components/Pages/Admin/AdminList";
import { HandleSearchProvider } from "../hooks/useHandleSearch";
import { MenuProvider } from "../hooks/useOpenMenu";
import CreateAdmin from "../components/Pages/Admin/CreateAdmin";
import EditAdmin from "../components/Pages/Admin/EditAdmin";
import ChangeAdminPassword from "../components/Pages/Admin/ChangeAdminPassword";
import MemberList from "../components/Pages/Admin/MemberList";
import EditMemberType from "../components/Pages/Admin/EditMemberType";
import CreateMemberType from "../components/Pages/Admin/CreateMemberType";
import CategoryList from "../components/Pages/Admin/CategoryList";
import EditCategory from "../components/Pages/Admin/EditCategory";
import CreateCategory from "../components/Pages/Admin/CreateCategory";
import MaterialsList from "../components/Pages/Admin/MaterialsList";
import CreateMaterial from "../components/Pages/Admin/CreateMaterial";
import EditMaterial from "../components/Pages/Admin/EditMaterial";
import MemberFieldsList from "../components/Pages/Admin/MemberFieldsList";
import CreateMemberField from "../components/Pages/Admin/CreateMemberField";
import EditMemberField from "../components/Pages/Admin/EditMemberField";
import CreateBook from "../components/Pages/Catalog/CreateBook";
import EditBook from "../components/Pages/Catalog/EditBook";
import ChangeImageBook from "../components/Pages/Catalog/ChangeImageBook";
import InfoBook from "../components/Pages/Catalog/InfoBook";
import CreateCopy from "../components/Pages/Catalog/Copy/CreateCopy";
import EditCopy from "../components/Pages/Catalog/Copy/EditCopy";
import CreateMember from "../components/Pages/Circulation/Member/CreateMember";
import AddMemberImage from "../components/Pages/Circulation/Member/AddMemberImage";
import FindMember from "../components/Pages/Circulation/Member/FindMember";
import PrivateRoutes from "../components/Layouts/PrivateRoutes";

const AppRoutes: React.FC = () => {

    return (
        <MenuProvider>
            <HandleSearchProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/catalog/detail/:id" element={<Detail />} />

                        <Route element={<PrivateRoutes permission="catalog_flg" />}>
                            <Route path="/catalog/info/:id" element={<InfoBook />} />
                            <Route path="/catalog/editbook/:id" element={<EditBook />} />
                            <Route path="/catalog/createbook" element={<CreateBook />} />
                            <Route path="/catalog/changeimage/:id" element={<ChangeImageBook />} />
                            <Route path="/catalog/createcopy/:bibid/:id?" element={<CreateCopy />} />
                            <Route path="/catalog/editcopy/:bibid/:id?" element={<EditCopy />} />

                            <Route path="/collection" element={<CategoryList />} />
                            <Route path="/collection/create" element={<CreateCategory />} />
                            <Route path="/collection/edit/:id" element={<EditCategory />} />

                            <Route path="/material" element={<MaterialsList />} />
                            <Route path="/material/create" element={<CreateMaterial />} />
                            <Route path="/material/edit/:id" element={<EditMaterial />} />
                        </Route>

                        <Route element={<PrivateRoutes permission="admin_flg" />}>
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/admin/createadmin" element={<CreateAdmin />} />
                            <Route path="/admin/editadmin/:id" element={<EditAdmin />} />
                            <Route path="/admin/cpass/:id" element={<ChangeAdminPassword />} />
                            <Route path="/admin/adminlist" element={<AdminList />} />
                        </Route>

                        <Route element={<PrivateRoutes permission="circ_flg" />}>
                            <Route path="/circulation" element={<Circulation />} />

                            <Route path="/mbrclassify" element={<MemberList />} />
                            <Route path="/mbrclassify/create" element={<CreateMemberType />} />
                            <Route path="/mbrclassify/edit/:id" element={<EditMemberType />} />

                            <Route path="/member/register" element={<CreateMember />} />
                            <Route path="/member/addimage/:mbrid" element={<AddMemberImage />} />
                            <Route path="/member/findmember" element={<FindMember />} />

                            <Route path="/mbrfield" element={<MemberFieldsList />} />
                            <Route path="/mbrfield/create" element={<CreateMemberField />} />
                            <Route path="/mbrfield/edit/:id" element={<EditMemberField />} />
                        </Route>
                    </Routes>
                </Layout>
            </HandleSearchProvider>
        </MenuProvider>
    );
}

export default AppRoutes;
