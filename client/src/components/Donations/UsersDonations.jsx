import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserDetail } from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import { Table } from "flowbite-react";
import "./Donations.css";

export default function UserDonations() {

    let { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserDetail(id));
    }, [dispatch, id])

    const user = useSelector((state) => state.userDetail);

    return <>
        <div id="my-donations" >
            <NavBar />
            <div className="w-full text-center p-5">
                <h3 className="text-6xl font-semibold italic text-gray-800">
                    Mis donaciones
                </h3>
                <h3 className="text-2xl p-3 text-gray-800">
                    Aquí podrás encontrar un resumen de tus últimos aportes a nuestra organización
                </h3>
            </div>
            <div className="m-4">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>
                            <span className="text-base">Fecha</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="text-base">Número de operación</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="text-base">Estado</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="text-base">Detalle de estado</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="text-base">Monto</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {user.donations?.length > 0 ? user.donations?.map((e) =>
                            <Table.Row id={e.paymentId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {e.date.slice(0, 10)}
                                </Table.Cell>
                                <Table.Cell>
                                    {e.paymentId}
                                </Table.Cell>
                                <Table.Cell>
                                    {e.status === "approved" ? "Aprobado" : null}
                                </Table.Cell>
                                <Table.Cell>
                                    {e.statusDetail === "accredited" ? "Acreditado" : null}
                                </Table.Cell>
                                <Table.Cell>
                                    ${e.donationAmount}
                                </Table.Cell>
                            </Table.Row>) : <Table.Row className="bg-white">
                            <Table.Cell>
                                No tenés donaciones registradas
                            </Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>}
                    </Table.Body>
                </Table>
            </div>
        </div>
    </>
}