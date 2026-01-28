export const API_config = {
    URL_SUPABASE : "https://emmbhmjxqldeqvbpjdrw.supabase.co/rest/v1",
    API_KEY : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtbWJobWp4cWxkZXF2YnBqZHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MzA3MDUsImV4cCI6MjA4MzMwNjcwNX0.qFcnEUA0--n-SD7Zo7H-kAldsWG8Mc1OtCIAXKPHqpo"
};

export const getHeaders = () => ({
    'apikey': API_config.API_KEY,
    'Authorization': `Bearer ${API_config.API_KEY}`,
    'content-type': 'application/json'
});
