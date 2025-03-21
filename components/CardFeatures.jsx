const CardFeatures = () => (
    <div className="card-features">
        {['favourite', 'view', 'share'].map((feature) => (
            <div className={feature} key={feature}>
                <img
                    src={`images/${feature}logo.svg`}
                    alt={feature.charAt(0).toUpperCase() + feature.slice(1)}
                    style={{ width: '18px', height: '18px' }}
                />
            </div>
        ))}
    </div>
);

export default CardFeatures