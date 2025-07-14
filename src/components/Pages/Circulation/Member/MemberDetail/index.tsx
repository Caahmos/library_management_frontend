import api from '../../../../../utils/api';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import ReturnButton from '../../../../Layouts/ReturnButton';
import useFlashMessage from '../../../../../hooks/useFlashMessages';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { RiImageAddLine, RiAdminLine } from "react-icons/ri";
import { TbUserEdit } from "react-icons/tb";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { TbLock, TbLockOpen } from "react-icons/tb";

import {
    Container,
    MemberContainer,
    MemberGrid,
    MemberContent,
    Content,
    HistContent,
    MemberCard,
    Left,
    Right,
    Image,
    Barcode,
    BookQtd,
    FingerprintIcon,
    UserIcon,
    BarcodeText,
    Name,
    Text,
    MemberText,
    MailIcon,
    NormalText,
    LocationIcon,
    NameContent,
    Since,
    SinceDate,
    Description,
    Hist,
    Button1,
    Button2,
    Button3,
    ButtonLeft,
    ButtonRight,
    ButtonText,
    Title,
    InfoCards,
    Card,
    CardLeft,
    CardRight,
    TopCard,
    BottomCard,
    CardTitle,
    CardDescription,
    MedalIcon,
    CalendarIcon
} from './styles';
import type { ViewMembersRequest } from '../../../../../model/Member/Member/ViewMembersRequest';
import type { ViewHistsRequest } from '../../../../../model/Biblio/BiblioStatusHist/ViewHistRequest';
import MiniBookHistItem from '../../../../Layouts/Catalog/MiniBookHistItem';
import type { MemberRank } from '../../../../../model/Biblio/BiblioReports/MemberRankInterface';

const MemberDetail: React.FC = () => {
    const { mbrid } = useParams();
    const [bookHist, setBookHist] = useState<ViewHistsRequest[]>();
    const [member, setMember] = useState<ViewMembersRequest>();
    const [memberRank, setMemberRank] = useState<MemberRank[]>();
    const [memberImage, setMemberImage] = useState('');
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        api.get(`/member/detail/${mbrid}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                const memberData = response.data.member;
                setMember(memberData);

                if (memberData.imageUrl) {
                    setMemberImage(`http://localhost:5000/imgs/member/${memberData.imageUrl}`);
                }
            })
            .catch((err: AxiosError) => {
                console.error(err);
            });
    }, [token, mbrid]);
    
    useEffect(() => {
        api.get(`/biblioreports/memberranks?mbrid=${mbrid}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                console.log(response.data.ranks);
                setMemberRank(response.data.ranks);
            })
            .catch((err: AxiosError) => {
                console.error(err);
            });
    }, [token, mbrid]);

    useEffect(() => {
            api.get(`/bibliohist/viewhists?mbrid=${mbrid}&limit=${50}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
                .then((response) => {
                    setBookHist(response.data.foundHists);
                    console.log(response.data.foundHists);
                })
                .catch((err) => {
                    console.error(err);
                });
        }, [token, mbrid]);

    const formatDate = (date?: string | Date | null) => {
        if (!date) return '-';
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    };

    const fields = [
        { key: 'barcode_nmbr', label: 'Tombo' },
        { key: 'due_back_dt', label: 'Devolução' },
    ];

    return (
        <Container>
            <ReturnButton />
            <MemberContainer>
                <MemberGrid>
                    <Hist>
                        <HistContent>
                            <Title>Histórico</Title>
                            {
                                bookHist ?
                                    <MiniBookHistItem fields={fields} items={bookHist} />
                                    : <p>Nenhum histórico encontrado.</p>
                            }
                        </HistContent>
                    </Hist>
                    <MemberCard>
                        {
                            member ?
                                <>
                                    <Left>
                                        <Image image={memberImage} />
                                        <Barcode>
                                            <FingerprintIcon /><BarcodeText>{member.barcode_nmbr}</BarcodeText>
                                        </Barcode>
                                        <BookQtd><MedalIcon/><p>{memberRank && memberRank.length > 0 ? memberRank[0].rank  + 'º' : 'Sem rank'}</p></BookQtd>
                                    </Left>
                                    <Right>
                                        <Name>
                                            <NameContent>
                                                <UserIcon /><Text>{member.first_name + ' ' + member.last_name}</Text>
                                            </NameContent>
                                            <Since>
                                                <CalendarIcon />
                                                <Description>
                                                    <SinceDate>membro desde:</SinceDate>
                                                    <NormalText>{formatDate(member.createdAt)}</NormalText>
                                                </Description>
                                            </Since>
                                        </Name>
                                        <MemberText>
                                            <MailIcon /><NormalText>{member.email}</NormalText>
                                        </MemberText>
                                        <MemberText>
                                            <LocationIcon /><NormalText>{member.address}</NormalText>
                                        </MemberText>
                                        <InfoCards>
                                            <Card>
                                                <CardLeft>
                                                    <TopCard><FaWhatsapp/></TopCard>
                                                    <BottomCard>
                                                        <CardTitle>Whatsapp</CardTitle>
                                                        <CardDescription>{member.home_phone || '(19) 99999-9999'}</CardDescription>
                                                    </BottomCard>
                                                </CardLeft>
                                                <CardRight>
                                                    <IoIosArrowForward/>
                                                </CardRight>
                                            </Card>
                                            <Card>
                                                <CardLeft>
                                                    <TopCard><FiPhone/></TopCard>
                                                    <BottomCard>
                                                        <CardTitle>Telefone 2</CardTitle>
                                                        <CardDescription>{member.work_phone || '(19) 99999-9999'}</CardDescription>
                                                    </BottomCard>
                                                </CardLeft>
                                                <CardRight>
                                                    <IoIosArrowForward/>
                                                </CardRight>
                                            </Card>
                                            <Card>
                                                <CardLeft>
                                                    <TopCard><RiAdminLine/></TopCard>
                                                    <BottomCard>
                                                        <CardTitle>Admin Res</CardTitle>
                                                        <CardDescription>{member.last_change_userid}</CardDescription>
                                                    </BottomCard>
                                                </CardLeft>
                                                <CardRight>
                                                    <IoIosArrowForward/>
                                                </CardRight>
                                            </Card>
                                        </InfoCards>
                                    </Right>
                                </>
                                :
                                <p>
                                    Nenhuma informação encontrada
                                </p>
                        }
                    </MemberCard>
                    <Button1>
                        <ButtonLeft>
                            <RiImageAddLine/>
                        </ButtonLeft>
                        <ButtonRight>
                            <ButtonText>
                                Editar ou Adicionar uma Imagem
                            </ButtonText>
                        </ButtonRight>
                    </Button1>
                    <Button2>
                        <ButtonLeft>
                            <TbUserEdit/>
                        </ButtonLeft>
                        <ButtonRight>
                            <ButtonText>
                                Editar Dados do Membro
                            </ButtonText>
                        </ButtonRight>
                    </Button2>
                    <Button3>
                        <ButtonLeft>
                            <TbLock/>
                        </ButtonLeft>
                        <ButtonRight>
                            <ButtonText>
                                Bloquear Usuário
                            </ButtonText>
                        </ButtonRight>
                    </Button3>
                    <MemberContent>
                        <Content>

                        </Content>
                    </MemberContent>
                </MemberGrid>
            </MemberContainer>
        </Container>
    )
};

export default MemberDetail;