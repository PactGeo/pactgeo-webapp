import countries from '~/data/countries';

export function timeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    const intervals = [
        { label: 'año', seconds: 31536000 },
        { label: 'mes', seconds: 2592000 },
        { label: 'día', seconds: 86400 },
        { label: 'hora', seconds: 3600 },
        { label: 'minuto', seconds: 60 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count > 1) {
            return `hace ${count} ${interval.label}s`;
        }
        if (count === 1) {
            return `hace ${count} ${interval.label}`;
        }
    }
    return "hace unos segundos";
}

export function formatDateISO(dateISO) {
    const date = new Date(dateISO);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export function getFlagByName(name: string) {
    return countries.find(c => c.name === name)?.flag;
}