export default function ErrorMessage ({title, desc, hidden, setHiddenCallback}: {title: string; desc: string, hidden:boolean | undefined, setHiddenCallback: Function}) {

    // voor hugo: om een x knop te maken om de error te sluiten, maak een button die een functie called die setHiddenCallback(true) doet

    return (<div hidden={hidden}>
        <h1>{title}</h1>
        <p>{desc}</p>
    </div>)
}