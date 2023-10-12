"use client";
import React, { useEffect, useState } from 'react';
import data from './data.json';
import styles from './page.module.css';
import Image from 'next/image';

export default function Home() {
    const [dataTools, setDataTools] = useState(data.tools);
    const defaultTools = dataTools.sort((a, b) => {
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
    const moisActuel = dateDuJour.getMonth();

    const montrerCaseDuJour = (cardId:any) => {
        if (cardId <= jourDuMois) {
            const updatedDataTools = dataTools.map(tool => {
                if (tool.id === cardId) {
                    const updatedTool = { ...tool, visible: true };
                    return updatedTool;
                }
                return tool;
            });
            setDataTools(updatedDataTools);
            localStorage.setItem('items', JSON.stringify(updatedDataTools));
        } else {
            alert(`Tu dois attendre le ${cardId}/${moisActuel} pour ouvrir cette carte.`)
        }
    };

    useEffect(() => {
        const localStorageData = localStorage.getItem('items');
        if (localStorageData) {
            setDataTools(JSON.parse(localStorageData));
        }
    }, []);

    return (
        <>
            <h1 className={styles.pageTitle}>&#127873; Calendrier de l&apos;avant Octo &#127877;&#127995;</h1>
            <section className={styles.cardContainer}>
                {defaultTools.map((tool) => (
                    moisActuel !== 11 || tool.id <= jourDuMois && tool.visible ? (
                        <div className={styles.card} key={tool.title}>
                            <a href={tool.link} target="_blank">
                                <Image
                                    className={styles.image}
                                    src={`/${tool.title.toLowerCase().replace(/ /g, '-')}.jpeg`}
                                    width={1000}
                                    height={1000}
                                    alt={`illustration de ${tool.title}`}
                                />
                            </a>
                            <hr />
                            <h2>{tool.title}</h2>
                            <hr />
                            <p className={styles.cardText}>
                                {tool.description}. Découvrez:{' '}
                                <a href={tool.link} target="_blank">{tool.title}</a>
                            </p>
                        </div>
                    ) : (
                        <div
                            className={styles.cardBlur}
                            key={tool.title}
                            onClick={() => montrerCaseDuJour(tool.id)}
                        >
                            <h2 className={styles.number}>{tool.id}</h2>
                            <div>
                                <Image
                                    className={styles.imageBlur}
                                    src={'/cadeau.png'}
                                    width={1000}
                                    height={1000}
                                    alt={`illustration de ${tool.title}`}
                                />
                            </div>
                        </div>
                    )
                ))}
            </section>
        </>
    );
}
