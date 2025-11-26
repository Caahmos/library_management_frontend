import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api";
import {
    ModalOverlay,
    ModalBox,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter,
    ExportButton,
    FormGroup,
    FormRow,
    FormLabel,
    FormInput,
    FormSelect
} from "./styles";

import { exportToExcel } from "../../../Utils/handleExportToXLSX";
import { RiFileExcel2Line } from "react-icons/ri";

const OverdueXlsx: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("@library_management:token") || "";

    const [limit, setLimit] = useState(15);
    const [order, setOrder] = useState("desc");
    const [loading, setLoading] = useState(false);

    const close = () => navigate(-1);

    const handleExport = async () => {
        setLoading(true);

        try {
            const response = await api.get(
                `/bibliohist/overduehists?limit=${limit}&order=${order}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`
                    }
                }
            );

            const items = response.data.items || [];

            // Campos que vão para o excel
            const fields = [
                { key: "nome", label: "Nome" },
                { key: "sobrenome", label: "Sobrenome" },
                { key: "rm", label: "RM" },
                { key: "dias_atraso", label: "Dias Atraso" },
                { key: "codigo_copia", label: "Código da Cópia" },
                { key: "titulo", label: "Título" },
                { key: "subtitulo", label: "Subtítulo" },
                { key: "Aluno", label: "Aluno" },
                { key: "Professor", label: "Professor" }
            ];

            await exportToExcel(items, fields, "atrasados.xlsx");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalOverlay>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>Exportar Atrasados</ModalTitle>
                    <ModalClose onClick={close}>×</ModalClose>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <FormRow>
                            <FormLabel>Limite</FormLabel>
                            <FormInput
                                type="number"
                                min={1}
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value))}
                            />
                        </FormRow>

                        <FormRow>
                            <FormLabel>Ordem</FormLabel>
                            <FormSelect value={order} onChange={(e) => setOrder(e.target.value)}>
                                <option value="asc">Crescente (asc)</option>
                                <option value="desc">Decrescente (desc)</option>
                            </FormSelect>
                        </FormRow>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <ExportButton onClick={handleExport} disabled={loading}>
                       <RiFileExcel2Line /> {loading ? "Gerando..." : "Gerar Excel"}
                    </ExportButton>
                </ModalFooter>

            </ModalBox>
        </ModalOverlay>
    );
};

export default OverdueXlsx;
