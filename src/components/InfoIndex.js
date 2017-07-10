import React from 'react';

const sortByScore = (a, b) => {
	if (a.score > b.score) {
		return -1;
	} else if (a.score < b.score) {
		return 1;
	} else {
		return 0;
	}
};

const InfoIndex = ({ index, shownInfo, username }) => {

	if (index.length === 0) {
		return <div className="no-info">No data to show!</div>;
	} else {
		return(
			<div>
				<div className="title">
					{`${username}'s ${shownInfo}`}
				</div>
				{
					index.sort(sortByScore).map((info, i) => {
						const displayedInfo = info.body || info.title;
						return(
							<div className="info-wrapper" key={info + i}>
								<div className="score">{info.score}</div>
								<div className="info">
									<div className="displayed-info">
										{ displayedInfo }
									</div>
									<a 
										href={info.url} 
										target="_blank" 
										className="url"
									>
										{info.url}
									</a>
								</div>
							</div>
						);
					})
				}
			</div>
		);
	}
};

export default InfoIndex;