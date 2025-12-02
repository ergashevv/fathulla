import { useTranslation } from 'react-i18next';
import CardImg1 from './Rectangle 137.png';
import CardImg2 from './Rectangle 138.png';
import CardImg3 from './Rectangle 139.png';
import CardImg4 from './Rectangle 140.png';
import CardImg5 from './Rectangle 141.png';
import CardImg6 from './Rectangle 142.png';
import './main.scss';

const EmployesTeam = () => {
    const {t} = useTranslation()
    const data = [
        {
            img: CardImg1,
            name: t("about.sodiq"),
            lastName: t("about.maslo")
        },
        {
            img: CardImg2,
            name: t("about.tura"),
            lastName: t("about.jir")
        },
        {
            img: CardImg3,
            name: t("about.ergashev"),
            lastName: t("about.suxoy")
        },
        {
            img: CardImg6,
            name: t("about.odilov"),
            lastName: t("about.krupa")
        },
        {
            img: CardImg5,
            name: t("about.yuldashev"),
            lastName: t("about.kraxmal")
        },
        // {
        //     img: CardImg6,
        //     name: "Юсупова Ольга Викторовна",
        //     lastName: "Администратор"
        // }
    ];

    const centeredStyle = {
        margin: 'auto'
    };

    return (
        <>
            <div className="employes-cards">
                {data?.map((i, k) => (
                    <div
                        className="employes-card"
                        key={k}
                        style={(i.img === CardImg5 || i.img === CardImg6) ? centeredStyle : {}}
                    >
                        <img src={i.img} alt="" />
                        <p>{i.name}</p>
                        <p className='last'>{i.lastName}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default EmployesTeam;
