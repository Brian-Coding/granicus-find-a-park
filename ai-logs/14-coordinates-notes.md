# Coordinate lookup notes (24 Nov 2026, afternoon CT)

Lookups for the Granicus Find a Park sample set. Public sources only. Nominatim User-Agent: `GranicusFindAPark-CoordResearch/1.0`. Rate limit: ≥1 second between requests. No coordinates were invented.

Sample file used: `src/data/parks.sample.json` on `origin/develop` (same 12 records as the take-home JSON).

## Nominatim name searches (NYC-focused)

| Query | Result |
| --- | --- |
| Prospect Park, Brooklyn, New York | Hit: park relation/9760157 at 40.6617743, -73.9710896 |
| Riverside Commons, New York | 0 results |
| Riverside Park, Manhattan, New York | Two park polygons: 40.8068797, -73.9686596 and 40.7879331, -73.9824555 (10024) |
| Cedar Hill Nature Preserve, New York | 0 results |
| Cedar Hill, New York park | Only Henry Hudson Park in Cedar Hill, Town of Bethlehem (Albany County) — not used |
| Sunset Playground, New York / Brooklyn / NYC | Sunset Park Playground Children’s Play Area, 44th Street, Brooklyn, way/881121558, 40.6477241, -74.0044270 |
| Sunset Park, Brooklyn, New York | Neighborhood + park 40.6479772, -74.0037501 |
| Highland Dog Park, New York | 0 results |
| Highland Park, Brooklyn, New York | Park way/61235624, 40.6871747, -73.8877422 |
| Veterans Memorial Field, Queens, New York | 0 results (unrelated Elmhurst Park Vietnam Veterans Memorial only) |
| Old Mill Botanical Garden, New York | 0 results |
| Lakeshore Point, New York | Only Lakeshore Road upstate (Orleans County) — not used |
| East Ridge Trailhead, New York | 0 results |
| Central Plaza Green, New York | 0 results |
| Willow Creek Wetlands, New York | 0 results |
| Hillcrest Skate Park, New York / NYC | 0 results |
| Bryant Park, Manhattan, New York | Park way/22727025, 40.7537509, -73.9835428 (near-miss only; not used as verified) |
| Willowbrook Park, Staten Island | Park 40.5994453, -74.1582914 (near-miss only; 5.78 km west of sample) |

## Address geocodes

| Query | Result |
| --- | --- |
| Riverside Drive, New York, NY 10024 | 40.7901418, -73.9802157 (UWS 10024 stretch) — recorded as addressGeocode |
| 44th Street and 7th Avenue, Brooklyn / Sunset Park variants | No single intersection node. 44th Street and 7th Avenue segments in Sunset Park exist, but Nominatim would not return the corner. Left addressGeocode null; used the playground match instead. |
| Memorial Drive, Queens, NY 11367 (and Kew Gardens Hills / Forest Park variants) | 0 results. Forest Park has a Memorial Drive in a different neighborhood; not used. |
| 12 Old Mill Lane, New York | Only houses outside NYC (Warren, Westchester, Washington, Delaware, Rockland). 0 results for Staten Island. |
| Shore Parkway, Brooklyn, NY | Several points along a multi-mile parkway — too vague for one point. |
| Ridge Road, Bronx, NY | 0 results |
| 1 Plaza Way, New York, NY | 0 results |
| Creek Road, Staten Island, NY | 0 results |
| Hillcrest Avenue, New York, NY | Hits in Staten Island and Queens (and upstate), not at the Downtown Brooklyn sample point. |
| Cedar Hill Road, New York, NY | Westchester, Queens (Far Rockaway / Inwood area 11559), Suffolk — none match a 212-acre NYC preserve. |

## Reverse geocode of every sample point (zoom=18)

| id | sample | Reverse result |
| --- | --- | --- |
| prospect-park | 40.6602, -73.969 | Center Drive, Flatbush / inside Prospect Park (11215) |
| riverside-commons | 40.8009, -73.9722 | Riverside Drive, Manhattan Valley |
| cedar-hill-nature-preserve | 40.7128, -74.006 | New York City Hall, 260 Broadway (~8 m away) |
| sunset-playground | 40.6452, -74.0121 | 444 51st Street, Sunset Park, Brooklyn 11220 (a few blocks SW of the park) |
| highland-dog-park | 40.6789, -73.9442 | 234 Herkimer Street, Bedford-Stuyvesant 11216 |
| veterans-memorial-field | 40.7282, -73.7949 | 74-26 175th Street, Fresh Meadows 11366 |
| old-mill-botanical-garden | 40.6215, -74.0776 | 75 Vanderbilt Avenue, Clifton, Staten Island 10304 |
| lakeshore-point | 40.5795, -73.9707 | 458 West 5th Street, West Brighton / Coney Island 11224 |
| east-ridge-trailhead | 40.8501, -73.8662 | 1988 Cruger Avenue, Bronxdale, Bronx 10462 |
| central-plaza-green | 40.7549, -73.984 | 42nd Street-Bryant Park station (0.13 km from Bryant Park; not used as a verified match) |
| willow-creek-wetlands | 40.6001, -74.0899 | 11 Scranton Street, Old Town, Staten Island 10304 |
| hillcrest-skate-park | 40.6934, -73.9876 | New York Marriott at the Brooklyn Bridge, Downtown Brooklyn |

## Other public pages

- Prospect Park Wikipedia centroid 40.66167, -73.97083 (0.23 km from sample). NYC Parks: https://www.nycgovparks.org/parks/prospect-park (526.25 acres, matches sample).
- Riverside Park Wikipedia centroid 40.80417, -73.97000 (0.41 km from sample). NYC Parks: https://www.nycgovparks.org/parks/riverside-park.
- Sunset Park Playground official page: https://www.nycgovparks.org/facilities/playgrounds/52 (6 Ave between 41st and 44th). Parent park: https://www.nycgovparks.org/parks/sunset-park (41st–44th Sts, 5th–7th Aves, 24.50 acres). OSM playground 0.71 km from sample.
- No NYC park named Cedar Hill Nature Preserve. Texas private preserve and Central Park’s Cedar Hill lawn were rejected.
- Highland Park official page: https://www.nycgovparks.org/parks/highland-park (4.85 km from sample; not used).
- NYC Parks skate parks list: https://www.nycgovparks.org/facilities/skateparks (no Hillcrest Skate Park).
- NYC Parks botanical gardens list has no Old Mill Botanical Garden.

## Decision rule applied

Verified coordinates were filled only for:

1. Prospect Park — exact named park.
2. Riverside Commons — plausible match by address to Riverside Park.
3. Sunset Playground — plausible match by address to Sunset Park Playground.

All others: `verified` is null. Near-misses (Bryant Park, Highland Park, Willowbrook Park, Snug Harbor, Forest Park Memorial Drive) are documented in notes only.
