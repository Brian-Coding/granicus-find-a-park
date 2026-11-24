# Sample coordinate research

This note accompanies `src/data/parkCoordinates.reference.json`. It is **reference material only**. The running app should keep using the supplied sample dataset (`src/data/parks.sample.json` / `assets/parks.sample.json`). These researched points are for a potential later fix; they are not wired into the UI, map, or tests.

Research was done on 24 Nov 2026 (afternoon, America/Chicago).

## Method

1. Read the twelve records in the sample JSON (id, name, sample lat/lng, address).
2. Search OpenStreetMap [Nominatim](https://nominatim.openstreetmap.org/) for each park name in New York City, then reverse-geocode every sample point to see what is actually there. Requests used User-Agent `GranicusFindAPark-CoordResearch/1.0` and were spaced at least one second apart.
3. Cross-check names and locations against [NYC Parks](https://www.nycgovparks.org/) facility and park pages and, where a well-known park matched, published Wikipedia coordinates.
4. Geocode sample addresses when they were specific enough (for example `Riverside Drive, New York, NY 10024`). An address geocode is **not** a verified park location.
5. **Do not invent coordinates.** If there is no exact named park and no plausible real-world match supported by the sample address, `verified` is `null`.

Match confidence values in the JSON:

| Value | Meaning |
| --- | --- |
| `exact named park` | A real park exists under this name (or a standard official name that is the same park). |
| `plausible real-world match by address` | The sample name is not official, but the sample address (and nearby point) identify a real park. |
| `address geocode` | A street or intersection was geocoded; it is not a verified park location. |
| `no real match found` | No defensible NYC park or unique address point; `verified` is `null`. |

Vague street-only addresses (`Shore Pkwy`, `Ridge Rd`, `Creek Rd`, `Cedar Hill Rd`, `Hillcrest Ave`) were left ungeocoded when Nominatim could not return a unique, relevant NYC result. A multi-mile parkway or a street name that exists in several boroughs is not a single point.

## Results at a glance

| id | name | Sample | Verified | Confidence | Distance / note |
| --- | --- | ---: | ---: | --- | --- |
| prospect-park | Prospect Park | 40.6602, -73.969 | 40.66167, -73.97083 | exact named park | 0.23 km; acreage also matches |
| riverside-commons | Riverside Commons | 40.8009, -73.9722 | 40.80417, -73.97000 | plausible match by address (Riverside Park) | 0.41 km; name is fictional |
| cedar-hill-nature-preserve | Cedar Hill Nature Preserve | 40.7128, -74.006 | *null* | no real match found | Generic NYC / City Hall point |
| sunset-playground | Sunset Playground | 40.6452, -74.0121 | 40.6477241, -74.0044270 | plausible match by address (Sunset Park Playground) | 0.71 km |
| highland-dog-park | Highland Dog Park | 40.6789, -73.9442 | *null* | no real match found | Highland Park is 4.85 km east; not used |
| veterans-memorial-field | Veterans Memorial Field | 40.7282, -73.7949 | *null* | no real match found | Memorial Dr not found in ZIP 11367 |
| old-mill-botanical-garden | Old Mill Botanical Garden | 40.6215, -74.0776 | *null* | no real match found | Address not in NYC |
| lakeshore-point | Lakeshore Point | 40.5795, -73.9707 | *null* | no real match found | Shore Pkwy too vague; sample is residential |
| east-ridge-trailhead | East Ridge Trailhead | 40.8501, -73.8662 | *null* | no real match found | Sample is a Bronxdale residential block |
| central-plaza-green | Central Plaza Green | 40.7549, -73.984 | *null* | no real match found | 0.13 km from Bryant Park; name/address do not match, so not used |
| willow-creek-wetlands | Willow Creek Wetlands | 40.6001, -74.0899 | *null* | no real match found | Willowbrook Park is 5.78 km west; not used |
| hillcrest-skate-park | Hillcrest Skate Park | 40.6934, -73.9876 | *null* | no real match found | Sample is the Brooklyn Bridge Marriott |

Only **Prospect Park** is an exact named match. **Riverside Commons** and **Sunset Playground** are plausible address matches to Riverside Park and Sunset Park Playground. The other nine names appear fictional or otherwise unmatched in NYC.

## The Cedar Hill finding

The sample coordinates for Cedar Hill Nature Preserve are exactly `40.7128, -74.006` — the textbook “New York City” point, commonly used as a stand-in for the city (New York City Hall / Lower Manhattan).

A Nominatim reverse geocode of that point returns **New York City Hall, 260 Broadway**, about 8 meters away. The address field is only `Cedar Hill Rd`, which does not identify a unique NYC street.

There is no NYC Parks site named Cedar Hill Nature Preserve. Two easy false friends were checked and rejected:

- A private **Cedar Hill Nature Preserve** in Milam County, Texas, is a different place and is not used.
- **Cedar Hill** in Central Park is a lawn, not a 212-acre nature preserve on Cedar Hill Road, and is not used.

This record is the clearest placeholder in the sample set: the map will drop a marker on City Hall unless a later fix replaces the point.

## Sources for the three matched parks

- Prospect Park: [Wikipedia](https://en.wikipedia.org/wiki/Prospect_Park_(Brooklyn)) (40°39′42″N 73°58′15″W = 40.66167, -73.97083); [NYC Parks](https://www.nycgovparks.org/parks/prospect-park).
- Riverside Park (plausible match for Riverside Commons): [Wikipedia](https://en.wikipedia.org/wiki/Riverside_Park_(Manhattan)) (40°48′15″N 73°58′12″W = 40.80417, -73.97000); [NYC Parks](https://www.nycgovparks.org/parks/riverside-park). Sample address `Riverside Dr, New York, NY 10024` geocodes along that park’s 10024 stretch of Riverside Drive.
- Sunset Park Playground (plausible match for Sunset Playground): [NYC Parks facility page](https://www.nycgovparks.org/facilities/playgrounds/52) (6th Avenue between 41st and 44th Streets, inside [Sunset Park](https://www.nycgovparks.org/parks/sunset-park), which runs 41st–44th Streets between 5th and 7th Avenues). Coordinates are the OpenStreetMap way centroid, [way/881121558](https://www.openstreetmap.org/way/881121558) (40.6477241, -74.0044270).
