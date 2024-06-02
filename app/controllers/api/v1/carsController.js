const carsService = require("../../../services/carsService");

module.exports = {
  async listTrue(req, res) {
    try {
      const cars = await carsService.listTrue();    
      res.status(200).json(cars);
    } catch(err) {
      console.error(err);
      res.status(500).json({ message: "Gagal mendapatkan daftar mobil." });
    }
  },

  async list(req, res) {
    const role = req.user.role;
    console.log(role);
    if(role == "superadmin" || role == "admin"){
      const cars = await carsService.list();    
      res.status(200).json(cars);
      return;
    }
      res.status(500).json({ message: "Gagal mendapatkan daftar mobil." });
  },

  async create(req, res) {
    const role = req.user.role;
    const name=req.body.name;
    const createBy = req.user.email;
    console.log(createBy);
    console.log(role);

    if(role == "superadmin" || role == "admin"){
      const carName = await carsService.findOne(name);
      if (!carName){
      const car = await carsService.create({ ...req.body, createBy: createBy });    
      res.status(201).json({message: "Mobil berhasil diinput"});
      return;
        } 
      else{
        res.status(402).json({message: "Nama Mobil Sudah Ada"});
        return;
      }
    }
        res.status(404).json({ message: "Mobil tidak berhasil diinput."});
        return;
  },

  async update(req, res) {
    const role = req.user.role;
    const name=req.params.name;
    const bodyName= req.body.name;
    const updateBy = req.user.email;

    console.log(role);
    if(role == "superadmin" || role == "admin"){
      const carName = await carsService.findOne(name);
      const bodyCarName = await carsService.findOne(bodyName)
      if (carName && bodyCarName){
      const updateData = { ...req.body, updateBy: updateBy };
      await carsService.update(req.params.name,updateData);
      res.status(201).json({
          status: "Data berhasil diupdate"
        });
      return;
      }
      else{
        res.status(402).json({message: "Nama Mobil Tidak Ada"});
        return;
      }
    }
        res.status(404).json({ message: "Data tidak berhasil diupdate." });
        return;
  },

  async show(req, res) {
    try {
        const car = await carsService.get(req.params.id);
        res.status(201).json({
            status: "OK",
            data: car,
          });
    } catch(err) {
        res.status(404).json({ message: err });
    }
  },

  async destroy(req, res) {
    const role = req.user.role;
    const name=req.params.name;
    const bodyName= req.body.name;

    console.log(role);
    if(role == "superadmin" || role == "admin"){
      const carName = await carsService.findOne(name);
      const bodyCarName = await carsService.findOne(bodyName);
      
      if (carName && bodyCarName){
      await carsService.delete(req.params.name);    
        res.status(202).json({
            status: "Data berhasil dihapus"
          });
      return;
      }
      else {
        res.status(402).json({message: "Nama Mobil Tidak Ada"});
        return;
      }
    }
      res.status(402).json({ message: "Data tidak berhasil dihapus" });
      return;
  },
};
