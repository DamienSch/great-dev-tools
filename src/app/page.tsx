import data from './data.json'
import styles from './page.module.css'
import Image from 'next/image'

export default function Home() {

    const defaultTools = data.tools.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });

    const dateDuJour = new Date();
    const jourDuMois = dateDuJour.getDate();

    return (
        <>
        <h1 className={styles.pageTitle}>&#127873; Calendrier de l'avant Octo &#127877;&#127995;</h1>
        <section className={styles.cardContainer}>
            { defaultTools.map((tool, index)=> (
                index < jourDuMois ? (
                    <div className={styles.card} key={tool.title}>
                        <a href={tool.link} target="_blank">
                            <Image src={`${tool.title.toLowerCase().replace(/ /g, "-")}.jpeg`} alt={`illustration de ${tool.title}`} />
                        </a>
                        <hr/>
                        <h2>{tool.title}</h2>
                        <hr/>
                        <p className={styles.cardText}>{tool.description}. Découvrez: <a href={tool.link} target="_blank">{tool.title}</a> </p>
                    </div>
                ) : (
                    <div className={styles.cardBlur}>
                        <Image src={`${tool.title.toLowerCase().replace(/ /g, "-")}.jpeg`} alt={`illustration de ${tool.title}`} />
                    </div>
                )
            ))}
        </section>
        </>
    )
}
