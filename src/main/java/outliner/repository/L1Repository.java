package outliner.repository;


import outliner.advanced.core.data.OutlinerRepository;
import outliner.domain.L1;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the L1 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface L1Repository extends OutlinerRepository<L1, Long> {

}
