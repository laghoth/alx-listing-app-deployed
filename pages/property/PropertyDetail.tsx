type Props = {
  property: any; // أو استعمل interface مفصل
};

export default function PropertyDetail({ property }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{property.hotel_name}</h1>
      <img
        src={property.main_photo_url}
        alt={property.hotel_name}
        className="mt-4 w-full max-w-md"
      />
      <p className="mt-2 text-gray-700">${property.min_total_price}</p>
      {/* زيد معلومات أخرى حسب الحاجة */}
    </div>
  );
}
