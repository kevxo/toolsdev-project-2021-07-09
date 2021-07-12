class ForcastsService
  def self.current_forcasts
    response = conn.get('/premium/v1/weather.ashx') do |req|
      req.params['q'] = '30.404251,-97.849442'
      req.params['num_of_days'] = '2'
      req.params['tp'] = '1'
      req.params['format'] = 'json'
      req.params['key'] = ENV['KEY']
    end

    JSON.parse(response.body, symbolize_names: true)[:data][:weather]
  end


  def self.conn
    Faraday.new(url: 'https://api.worldweatheronline.com')
  end
end