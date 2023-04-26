// const Markers = ({ map }) => {
// 	const [data, setData] = useState(locations);
// 	const [highlight, setHighlight] = useState(null);

// 	return (
// 		<>
// 			{Object.entries(data).map(([_, location]) => (
// 				<Marker
// 					key={location.id}
// 					map={map}
// 					location={location}
// 				>
// 					<div
// 						className={`marker ${highlight === location.id ? "highlight" : ""}`}
// 						onMouseOver={() =>
// 							setHighlight(location.id) && console.log(location.id)
// 						}
// 						onMouseLeave={() => setHighlight(null)}
// 					>
// 						<h2>{location.address}</h2>
// 						{highlight === location.id ? (
// 							<div className="address">
// 								<p>{location.address}</p>
// 							</div>
// 						) : null}
// 					</div>
// 				</Marker>
// 			))}
// 		</>
// 	);
// };

// export default Markers;

function Marker({ map, location, children }) {
	const markerRef = useRef();
	const rootRef = useRef();

	useEffect(() => {
		if (!rootRef.current) {
			// set up a mini react app
			const container = document.createElement("div");
			rootRef.current = createRoot(container);

			markerRef.current = new window.google.maps.marker.AdvancedMarkerView({
				position: location.position,
				content: container,
			});
		}
	}, [location.position]);

	useEffect(() => {
		rootRef.current.render(children);
		markerRef.current.position = location.position;
		markerRef.current.map = map;
	}, [map, location.position, children]);
}
