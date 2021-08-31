interface ICountry {
    name: string;
}

interface ContriesProps {
    countries: ICountry[];
}

export function CountriesList({ countries }: ContriesProps) {
    return (
        <ul>
            {countries.map((country, index) => (
                <li key={index}>{country.name}</li>
            ))}
        </ul>
    );
}