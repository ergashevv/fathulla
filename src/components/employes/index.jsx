import { useTranslation } from 'react-i18next';
import CardImg1 from './Rectangle 137.png';
import CardImg2 from './Rectangle 138.png';
import CardImg3 from './Rectangle 139.png';
import CardImg4 from './Rectangle 140.png';
import CardImg5 from './Rectangle 141.png';
import CardImg6 from './Rectangle 142.png';
import './main.scss';

const Employes = () => {
    const {t} = useTranslation()
    const data = [
        {
            img: CardImg1,
            name: t("about.ibragimov"),
            lastName:t("about.uchi")
        },
        {
            img: CardImg2,
            name: t("about.sadiqev"),
            lastName:t("about.uchi")
        },
        {
            img: CardImg3,
            name: t("about.rasul"),
            lastName:t("about.uchi")
        },
        // {
        //     img: CardImg4,
        //     name: "Имя",
        //     lastName:"Должность"
        // },
        {
            img: CardImg5,
            name: t("about.nasi"),
            lastName:t("about.direc")
        },
        // {
        //     img: CardImg6,
        //     name: "Имя",
        //     lastName:"Должность"
        // },
    ];

    const centeredStyle = {
        margin: 'auto'
    };



    return (
        <>
            <div className="employes-cards" style={{marginLeft: "-17px"}}>
                {data?.map((i, k) => (
                    <div
                        className="employes-card"
                        key={k}
                        style={i.name === "Насиров Санжар Хуснитдинович" ? centeredStyle : {}}
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

export default Employes;
